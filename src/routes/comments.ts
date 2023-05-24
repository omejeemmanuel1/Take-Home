import express from "express";
import { createComment, fetchComments } from "../controller/commentsController";
import { auth } from "../middleware/auth";
const {authenticatedUser} = require("../middleware/index");
// import authenticatedUser from "../middleware/index";
const router = express.Router();

router.post('/comments', authenticatedUser, createComment);
router.get('/comments', authenticatedUser, fetchComments);

export default router;