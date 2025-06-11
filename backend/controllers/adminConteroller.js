import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const loginUser = async (req, res) => {
  //get the username and password from the request body
  console.log(req.body);
  try {
    const { username, password } = req.body;

    //check if the username is in the document
    const user = await Admin.findOne({ username });
    // console.log(user)
    if (!user) {
      res.status(400).json({ message: 'incorrect username' });
      return;
    }

    if(user&&(await bcrypt.compare(password,user.password))){
      res.json({
        id:user.id,
        username:user.username,
        token:generateToken(user.id)

      })
    }else{
     return res.status(400).json({message:'Invalid credentials'})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
   }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

export default loginUser;
