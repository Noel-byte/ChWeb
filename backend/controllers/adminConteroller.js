import Admin from '../models/Admin.js';
import Post from '../models/Posts.js';
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

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

const createPost = async (req, res) => {
  try {
    console.log('Body: ',req.body)
    const { content } = req.body;

    if(!content||content.trim()===''){
      console.error('content required')
      return res.status(400).json({message:'Content is required'})
    }
    //create a post in the database
    const newPost = new Post({ content });

    //save the post
    const savePost = await newPost.save();

    res
      .status(201)
      .json({ message: 'Post created successfully', data: savePost });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating a post',
      error: error.message,
    });
  }
};

export { loginUser, createPost };
