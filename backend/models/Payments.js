import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  amount: Number,
  status: {type:String,default:'Not Payed'},
  createAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
