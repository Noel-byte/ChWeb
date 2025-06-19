import express from 'express';
import {createPost,deletePost,updatePost} from '../controllers/adminConteroller.js';


const router = express.Router();


router.post('/post',createPost)
router.delete('/posts/:postId',deletePost)
router.put('/posts/:postId',updatePost)


export default router