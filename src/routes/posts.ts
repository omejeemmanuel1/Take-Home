import express,{Response, Request } from'express';
import { createPost } from '../controller/createPost';
import { auth } from '../middleware/auth';
import blockAccountFromPost from '../controller/blockAccount'

const router = express.Router();


router.post('/create-post', auth, createPost);
router.patch('/block/:id', auth, blockAccountFromPost);

export default router;
