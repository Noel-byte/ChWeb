import Stripe from 'stripe';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load .env (optional — Netlify UI also sets these)
dotenv.config();

import Donation from '../../../backend/models/Donations.js'
import Payment from '../../../backend/models/Payments.js'; // ✅ adjust to your structure

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Keep a cached DB connection
let conn = null;

export const handler = async (event) => {
  console.log('🔔 Netlify webhook called!');

  // 1️⃣ Connect to MongoDB Atlas
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  }

  // 2️⃣ Verify Stripe signature
  const sig = event.headers['stripe-signature'];
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      import.meta.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Signature verified');
  } catch (err) {
    console.error(`❌ Webhook signature error: ${err.message}`);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // 3️⃣ Handle event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const type = session.metadata.type;
    const email = session.metadata.userEmail;
    const memberId = session.metadata.memberId;
    const amount = session.amount_total / 100;

    console.log(`📌 type=${type}, email=${email}, memberId=${memberId}, amount=${amount}`);

    try {
      if (type === 'donation') {
        const donation = new Donation({ email, amount });
        await donation.save();
        console.log(`✅ Donation saved`);
      } else if (type === 'payment') {
        const payment = new Payment({ member: memberId, amount, status: 'Paid' });
        await payment.save();
        console.log(`✅ Payment saved`);
      } else {
        console.warn(`⚠️ Unknown type: ${type}`);
      }
    } catch (err) {
      console.error(`❌ DB save error: ${err.message}`);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
