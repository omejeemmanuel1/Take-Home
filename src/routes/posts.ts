import express,{Response, Request } from'express';
import { createPost, togglePostVisibility, likePost} from '../controller/post';
import { auth } from '../middleware/auth';
import blockAccountFromPost from '../controller/blockAccount'

const router = express.Router();


router.post('/create-post', auth, createPost);
router.put('/like-post/:id',auth, likePost )
router.patch('/block/:id', auth, blockAccountFromPost);

router.put('/toggle-visibility/:postId', auth, togglePostVisibility);


export default router;
