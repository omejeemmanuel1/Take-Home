import express from "express";
import { createComment, fetchComments, likeComment } from '../controller/commentsController';
import { auth } from "../middleware/auth";

// const {authenticatedUser} = require("../middleware/index");
// import authenticatedUser from "../middleware/index";
const router = express.Router();

router.post('/create-comment', auth, createComment);
router.get('/', auth, fetchComments);
router.put('/:id', likeComment);
// router.delete('/:commentId', auth, deleteComment);

export default router;