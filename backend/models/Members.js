import mongoose from 'mongoose';

const spouseSchema = new mongoose.Schema({
  firstname: { type: String, required: false },
  middlename: { type: String, required: false },
  lastname: { type: String, required: false },
});

const memberSchema = new mongoose.Schema({
  memberid: { type: String, required: true },
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  martialstatus: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalcode: { type: String, required: true },
  address: { type: String, required: true },
  startdate: { type: Date, default: Date.now },
  membershipfee: { type: String, required:true },
  membershiptype:{type:String,required:true},
  spouse: {type:[spouseSchema],required:false} 
});

const Member = mongoose.model('Member', memberSchema);
export default Member
