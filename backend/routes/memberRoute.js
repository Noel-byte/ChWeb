
import express from 'express'
import  {createMember,getMember,processPayment,processDonation}  from '../controllers/memberController.js';
import { authorize,checkAdmin,protect } from '../middleware/authorizeMembers.js';

const router = express.Router();

// api/members -- creates a new member

router.post('/',createMember)
router.get('/user',protect,getMember)
router.post('/create-checkout-session-annualfee',protect,processPayment);
router.post('/create-checkout-session-donation',protect,processDonation)

export default router