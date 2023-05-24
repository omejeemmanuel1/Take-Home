import { Request, Response } from "express";
import Comment from "../model/commentsModel";

export const createComment = async (req: Request, res: Response) => {
    try{
        const {postId, userId, comment} = req.body;

        const newComment = await Comment.create({
            id: comment.id,
            post_id: postId,
            user_id: userId,
            comment,
        });
        res.status(201).json({comment: newComment});
    }catch(err){
        console.error('Error creating comment', err);
        res.status(500).json({error: 'Failed to create comment'});
    }
};

export const fetchCommentsByUserAndPost = async (req: Request, res: Response) => {
    try{
        const {postId, userId} = req.params;

        const comments = await Comment.findAll({
            where: {
                post_id: postId,
                user_id: userId,
            }
        });

        res.json({comments});

    }catch(err){
        console.error('Error fetching comments', err);
        res.status(500).json({error: 'Failed to fetch comments'});
    }
}
