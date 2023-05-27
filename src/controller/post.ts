import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createPostSchema, options } from "../utils/utils";
import Post from "../model/postModel";
import jwt, { Secret } from 'jsonwebtoken';

export const createPost = async (req: Request | any, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
      return res.status(401).json({ Error: 'Unauthorized' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret); // Verify the token

    if (!verified) {
      return res.status(401).json({ Error: 'Token not valid' });
    }

    const id = uuidv4();

    // Validate the post data
    const validateResult = createPostSchema.validate(req.body, options);

    if (validateResult.error) {
      return res.status(400).json({ Error: validateResult.error.details[0].message });
    }

    const userId = (verified as { id: string }).id; // Extract the id from verified

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
