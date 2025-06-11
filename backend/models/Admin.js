import mongoose from 'mongoose';

//create the schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//create the document

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
