import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createPostSchema,updatePostSchema, options } from "../utils/utils";
import Post from "../model/postModel"

export const createPost = async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;
    const id = uuidv4();

    // Validate the post data
    const validateResult = createPostSchema.validate(req.body, options);

    if (validateResult.error) {
      return res.status(400).json({ Error: validateResult.error.details[0].message });
    }

    const userId = verified?.id; // Extract the id from verified

    if (!userId) {
      return res.status(400).json({ Error: 'Invalid user ID' });
    }

    const postRecord = await Post.create({
      id,
      ...req.body,
      userId: userId, // Use the extracted userId
    });

    return res.status(201).json({
      msg: 'Post created successfully.',
      postRecord,
    });
  } catch (error) {
    console.log(error);
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




