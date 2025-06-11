import express from 'express';
import loginUser from '../controllers/adminConteroller.js';
import passport from 'passport'
import jwt from 'jsonwebtoken'

const router = express.Router();

//local login
router.post('/login',loginUser)

//google OAuth routes
// router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

// router.get(
//     '/auth/google/callback',
//     passport.authenticate('google',{session:false,failureRedirect:'/'}),
//     (req,res)=>{
//         const token = jwt.sign(req.user,process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

//         //send token as json
//         res.json({token})
//     }
// )

export default router