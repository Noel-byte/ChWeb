import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import Member from '../models/Members.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-token', async (req, res) => {
  let token;
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' });
  }

  try {
    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    

    // Find church member by email
    const member = await Member.findOne({ email });
    if (!member) {
      token = jwt.sign(
        {
          id: payload.jti,
          email: payload.email,
          googleid: payload.sub,
          name: payload.name,
          notmember: true,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
    } else {
      // Optional: save googleId for member if you want
      if (!member.googleId) {
        member.googleId = payload.sub; // Google user ID
        await member.save();
      }

      // Create your own JWT token for your app
      token = jwt.sign(
        { id: member._id, email: member.email, googleid: payload.sub },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
    }

    //set is as HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      //  secure:true, // use true in production with HTTPS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    //Respond with success message
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401).json({ error: 'Invalid ID token' });
  }
});

// logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.json({message:'Logged out'})
});

export default router;
