import express,{Response, Request } from'express';
import { createPost, fetchAllPosts, fetchPostById, fetchPostsByUser } from '../controller/createPost';
import { auth } from '../middleware/auth';

const router = express.Router();


router.post('/create-post', auth, createPost);
router.get('/all', fetchAllPosts);
router.get('/postId', auth, fetchPostById);
router.get('/userId', auth, fetchPostsByUser);

export default router;
