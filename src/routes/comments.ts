import express from "express";
import { createComment, fetchCommentsByUserAndPost } from "../controller/commentsController";

const router = express.Router();

router.post('/comments', createComment);
router.get('/comments', fetchCommentsByUserAndPost);

export default router;