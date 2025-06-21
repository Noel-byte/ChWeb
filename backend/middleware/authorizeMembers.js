import jwt from 'jsonwebtoken';
import Member from '../models/Members.js';

export const protect = async (req, res, next) => {
  try {
    //get the token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not Authorized: No token' });
    }

    //verify token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (verifiedToken.notmember) {
      req.user = {
        notmember: true,
        email: verifiedToken.email,
      };
    } else {
      //for members
      const member = await Member.findById(verifiedToken.id);

      const googleid = verifiedToken.googleid;

      //from verfied token get the email address
      const userEmail = verifiedToken.email;

      const isAdmin = [
        'tskeren90@gmail.com',
        'horizon33noela@gmail.com',
      ].includes(userEmail);

      req.user = {
        member,
        isAdmin,
        notmember: false,
        googleid,
        email: member.email,
      };
    }
    next(); //advance to the next middlewar
  } catch (error) {
    res.status(401).json({ message: 'Not Authorized: Invalid token' });
  }
};
