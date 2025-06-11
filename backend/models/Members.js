import mongoose from 'mongoose';

const spouseSchema = new mongoose.Schema({
  spousefirstname: { type: String, required: false },
  spousemiddlename: { type: String, required: false },
  spouselastname: { type: String, required: false },
});

const memberSchema = new mongoose.Schema({
  memberid: { type: String, required: true ,unique:true},
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  maritalstatus: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalcode: { type: String, required: true },
  address: { type: String, required: true },
  startdate: { type: Date, default: Date.now },
  membershiptype:{type:String,required:true},
  googleId:{type:String,required:false},
  spouse: {type:spouseSchema,required:false} 
});

const Member = mongoose.model('Member', memberSchema);
export default Member
