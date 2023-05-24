import express,{Response, Request } from'express';
import { createPost } from '../controller/createPost';
import { auth } from '../middleware/auth';

const router = express.Router();


router.post('/create-post', auth, createPost);

export default router;
