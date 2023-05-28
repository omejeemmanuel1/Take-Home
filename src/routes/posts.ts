import express,{Response, Request } from'express';
import { createPost, fetchAllPosts, fetchPostsByUser, togglePostVisibility, updatePost ,deletePost } from '../controller/post';
import { auth } from '../middleware/auth';
import blockAccountFromPost from '../controller/blockAccount'

const router = express.Router();


router.post('/create-post', auth, createPost);
router.get('/all', fetchAllPosts);
router.get('/userId', auth, fetchPostsByUser);
router.patch('/block/:id', auth, blockAccountFromPost);
router.put('/toggle-visibility/:postId', auth, togglePostVisibility);
router.put("/updatePost/:id" , updatePost)
router.delete("/deletePost/:id" , deletePost)


export default router;
