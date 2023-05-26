import express,{Response, Request } from'express';
import { createPost, togglePostVisibility } from '../controller/post';
import { auth } from '../middleware/auth';
import blockAccountFromPost from '../controller/blockAccount'

const router = express.Router();


router.post('/create-post', auth, createPost);
router.patch('/block/:id', auth, blockAccountFromPost);

router.put('/toggle-visibility/:postId', auth, togglePostVisibility);


export default router;
