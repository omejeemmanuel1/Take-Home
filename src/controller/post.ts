import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createPostSchema, updatePostSchema, options } from "../utils/utils";
import Post, { PostAttributes } from "../model/postModel";
import jwt, { Secret } from 'jsonwebtoken';
import { uploadFile } from '../middleware/cloudinary'; // Assuming you export the functions from the file where you defined them
import { UploadApiResponse } from "cloudinary"



export const createPost = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ Error: 'Unauthorized' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);

    if (!verified) {
      return res.status(401).json({ Error: 'Token not valid' });
    }

    const id = uuidv4();

    const validateResult = createPostSchema.validate(req.body, options);

    if (validateResult.error) {
      return res.status(400).json({ Error: validateResult.error.details[0].message });
    }

    const userId = (verified as { id: string }).id;

    const postData: PostAttributes = {
      id,
      ...req.body,
      userId: userId,
      image: [],
      video: [],
    };

    const { image, video } = req.body;

    if (image) {
      try {
        const uploadResult = await uploadFile(image, id, 'image');

        if (uploadResult.secure_url) {
          postData.image = [uploadResult.secure_url];
        } else {
          return res.status(400).json({ Error: 'Error uploading the image' });
        }
      } catch (error) {
        return res.status(400).json({ Error: 'Error uploading the image' });
      }
    }

    if (video) {
      try {
        const uploadResult = await uploadFile(video, id, 'video');

        if (uploadResult.secure_url) {
          postData.video = [uploadResult.secure_url];
        } else {
          return res.status(400).json({ Error: 'Error uploading the video' });
        }
      } catch (error) {
        return res.status(400).json({ Error: 'Error uploading the video' });
      }
    }


    try {
      const newPost = await Post.create(postData);
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ Error: 'Failed to create the post' });
    }
  } catch (error) {
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
};



  

export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const id  = req.user;

    const postToLike = await Post.findOne({ where: { id: postId } });

    if (!postToLike) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    const likeArr = postToLike.like;
    if (likeArr.includes(id)) {
      const arr = likeArr.filter((item: any) => item !== id);
      const unlikedPost = await postToLike.update({
        like: arr
      });

      return res.status(200).json({
        message: "You have unliked the post",
        numberOfLikes: arr.length
      });
    }

    likeArr.push(id);
    const likedPost = await postToLike.update({
      like: likeArr
    });

    return res.status(201).json({
      message: "You have liked this post",
      numberOfLikes: likeArr.length,
      likedPost
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





  
export const togglePostVisibility = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    // Find the post by postId
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ Error: 'Post not found' });
    }

    // Toggle the visibility
    post.visible = !post.visible;

    // Save the changes
    await post.save();

    return res.status(200).json({
      msg: 'Post visibility toggled successfully.',
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
};

//======================FETCH ALL POSTS===========================//

export const fetchAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    if (posts.length === 0) {
      return res.status(404).json({
        msg: 'No posts found',
      });
    }

    return res.status(201).json({
      msg: 'You have successfully retrieved all posts',
      posts,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'An error occurred while retrieving the posts',
    });
  }
};

//=====================FETCH POST BY USERID=========================//

export const fetchPostsByUser = async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;

    const posts = await Post.findAll({
      where: { userId: verified.id },
    });

    return res.status(201).json({
      msg: 'Posts retrieved successfully',
      posts,
    });
    
  } catch (error) {
    res.status(500).json({ Error: 'Internal Server Error' });
  }
};

//=================DELETE POST=========================//

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id; 

    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    await post.destroy();

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



//==========================UPDATE POST===============================//

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id; 
    const updatedData = req.body; 


    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

   
    await post.update(updatedData);

   
    const updatedPost = await Post.findByPk(postId);

    return res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {

    console.log(error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
