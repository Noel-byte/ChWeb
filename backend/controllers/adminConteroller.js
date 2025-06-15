import Admin from '../models/Admin.js';
import Post from '../models/Posts.js';
import jwt from 'jsonwebtoken';


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
