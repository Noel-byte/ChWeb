// console.log('Starting server...');
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import memberRoute from './routes/memberRoute.js';
import Stripe from 'stripe';
import adminRoutes from './routes/adminRoutes.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import webhookRoutes from './routes/webhookRoutes.js';

import authRoutes from './routes/authRoutes.js';
import './config/passport.js'; //triggers strategy registration

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://faithbridge.netlify.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use('/api/stripe', webhookRoutes);
app.use(cookieParser()); //parse cookies
app.use(express.json()); //parse json body

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

app.use('/api/members', memberRoute);
app.use('/api/admin', adminRoutes);

//connect ot MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server is running on port ${[PORT]}`));
  })
  .catch((err) => console.log(err));
