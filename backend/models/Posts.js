import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  post: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
