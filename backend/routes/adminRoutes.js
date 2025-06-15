import express from 'express';
import {createPost} from '../controllers/adminConteroller.js';


const router = express.Router();


router.post('/post',createPost)


export default router