import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Comment from "../model/commentsModel";

export const createComment = async (req: JwtPayload, res: Response) => {
    try{
        const userId = req.user
        const {postId, comment} = req.body;

        // const newComment = await Comment.create({
        //     id: comment.id,
        //     post_id: postId,
        //     user_id: userId,
        //     comment,
        // });
        // res.status(201).json({comment: newComment});
    }catch(err){
        console.error('Error creating comment', err);
        res.status(500).json({error: 'Failed to create comment'});
    }
};

export const fetchComments = async (req: JwtPayload, res: Response) => {
    try{
        const userId = req.user.id
        const {postId} = req.params;

        const comments = await Comment.findAll({
            where: {
                post_id: postId,
                user_id: userId,
            },
            // limit: 10
        });

        res.json({comments});

    }catch(err){
        console.error('Error fetching comments', err);
        res.status(500).json({error: 'Failed to fetch comments'});
    }
}
