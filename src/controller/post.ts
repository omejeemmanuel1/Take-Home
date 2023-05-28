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
