import mongoose, { now, Schema } from "mongoose";

const donationSchema = new Schema({
    googleid:String,
    email:String,
    amount:Number,
    createAt:{type:Date,default:Date.now}
})

const Donation = mongoose.model('Donation',donationSchema)

export default Donation