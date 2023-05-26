import express,{Response, Request } from'express';
import { createPost, likePost } from '../controller/createPost';
import { auth } from '../middleware/auth';

const router = express.Router();


router.post('/create-post', auth, createPost);
router.put('/like-post/:id',auth, likePost )

export default router;
