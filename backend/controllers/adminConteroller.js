import Post from '../models/Posts.js';

const createPost = async (req, res) => {
  try {
    console.log('Body: ', req.body);
    const { content } = req.body;

    if (!content || content.trim() === '') {
      console.error('content required');
      return res.status(400).json({ message: 'Content is required' });
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

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    await Post.findByIdAndUpdate(postId, { content });
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

export { createPost, deletePost, updatePost };
