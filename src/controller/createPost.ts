import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createPostSchema, options } from "../utils/utils";
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

  