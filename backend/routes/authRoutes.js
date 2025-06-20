import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import Member from '../models/Members.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-token', async (req, res) => {
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

    console.log('payload: ', payload);

    // Find church member by email
    const member = await Member.findOne({ email });
    if (!member) {
      const token = jwt.sign(
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
      return res.json({ token });
    } else {
      // Optional: save googleId for member if you want
      if (!member.googleId) {
        member.googleId = payload.sub; // Google user ID
        await member.save();
      }

      // Create your own JWT token for your app
      const token = jwt.sign(
        { id: member._id, email: member.email, googleid: payload.sub },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      res.json({ token });
    }
  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401).json({ error: 'Invalid ID token' });
  }
});

export default router;
