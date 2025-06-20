import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Member from '../models/Members.js';

export const authorize = async (req, res, next) => {
  //verify if there is authorization on the headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get the token from the headers
      token = req.headers.authorization.split(' ')[1];

      //verify the token
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //from verified token we can get the user id
      const member = Admin.findById(verified.id).select('-password'); //select the user from the document except the password

      if (!member) return res.status(404).json({ message: 'Member not found' });

      //attach the user to the request body
      req.member = member;
      next(); //advance to the next middleware
    } catch (error) {
      res.status(401).json('Authentication failed');
    }
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};

export const protect = async (req, res, next) => {
  let token;
  //verify if there is an authorization headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get the token from the header
      token = req.headers.authorization.split(' ')[1];

      //verify the token
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (verifiedToken.donation) {
        req.user = verifiedToken;
        next();
      } 
      else if(verifiedToken.notmember){
        req.user = verifiedToken
        next()
      }
      
      else {
        //from verified token we can get the member id
        const member = await Member.findById(verifiedToken.id);
        if (!member)
          return res.status(404).json({ message: 'Member not found' });

        //attach the memeber to the request body
        req.user = member;
        req.user.googleid = verifiedToken.googleid;
        //from verfied token get the email address
        const userEmail = verifiedToken.email;
        // req.user.isAdmin =  userEmail === 'tskeren90@gmail.com';
        req.user.isAdmin = [
          'tskeren90@gmail.com',
          'horizon33noela@gmail.com',
        ].includes(userEmail);

        //  || userEmail === 'horizon33noela@gmail.com';

        next(); //advance to the next middlewar
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized' });
  }
};
