
import express from 'express'
import  createMember  from '../controllers/memberController.js';

const router = express.Router();

// api/members -- creates a new member

router.post('/',createMember)

export default router