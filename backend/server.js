// console.log('Starting server...');
import dotenv from 'dotenv';
dotenv.config();
console.log('Loaded env vars...');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import memberRoute from './routes/memberRoute.js';
import Stripe from 'stripe';
import Member from './models/Members.js';
import adminRoutes from './routes/adminRoutes.js';
import passport from 'passport';

import authRoutes from './routes/authRoutes.js';
import './config/passport.js'; //triggers strategy registration

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

app.use('/api/members', memberRoute);
app.use('/api/admin', adminRoutes);

app.get('/',(req,res)=>{
  res.send('Backend is running')
})

//connect ot MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server is running on port ${[PORT]}`));
  })
  .catch((err) => console.log(err));
