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
    // 1️⃣ Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // 2️⃣ Find church member by email
    const member = await Member.findOne({ email });

    let accessToken;
    let refreshToken;

    if (!member) {
      // Not registered yet: make a limited JWT
      accessToken = jwt.sign(
        {
          id: payload.jti,
          email: payload.email,
          googleid: payload.sub,
          name: payload.name,
          notmember: true,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' } // ✅ short-lived
      );

      refreshToken = jwt.sign(
        {
          id: payload.jti,
          email: payload.email,
          googleid: payload.sub,
          name: payload.name,
          notmember: true,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // ✅ long-lived
      );
    } else {
      // Optional: save Google ID if not saved before
      if (!member.googleId) {
        member.googleId = payload.sub;
        await member.save();
      }

      // 3️⃣ Create both tokens for valid member
      accessToken = jwt.sign(
        {
          id: member._id,
          email: member.email,
          isAdmin:member.isAdmin,
          googleid: payload.sub,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' } // ✅ short-lived
      );

      refreshToken = jwt.sign(
        {
          id: member._id,
          email: member.email,
          isAdmin:member.isAdmin,
          googleid: payload.sub,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // ✅ long-lived
      );
    }

    // 4️⃣ Set both tokens as HttpOnly cookies
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5️⃣ Respond
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401).json({ error: 'Invalid ID token' });
  }
});

router.get('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        isAdmin:decoded.isAdmin,
        googleid: decoded.googleid,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15m' }
    );

    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: 'Access token refreshed' });
  });
});

// logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    // secure: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  });

  res.clearCookie('refreshToken', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None',
});

  res.json({ message: 'Logged out' });
});

export default router;
