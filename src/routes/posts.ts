import express,{Response, Request } from'express';
import { createPost, togglePostVisibility } from '../controller/post';
import { auth } from '../middleware/auth';

const router = express.Router();


router.post('/create-post', auth, createPost);

router.put('/toggle-visibility/:postId', auth, togglePostVisibility);


export default router;
