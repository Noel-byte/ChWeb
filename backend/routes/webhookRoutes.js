import express from 'express';
import Stripe from 'stripe';
import Donation from '../models/Donations.js';
import bodyParser from 'body-parser';
import Payment from '../models/Payments.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// ⚡️ Stripe requires the raw body for signature verification
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET // set this in your .env
      );
    } catch (err) {
      console.log(`Webhook signature error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const type = session.metadata.type;
      const amount = session.amount_total / 100;
      // Handle the event
      try {
        if (type === 'donation') {
          const email = session.metadata.userEmail;
          const newDonation = new Donation({ email, amount });
          await newDonation.save();
          console.log('Donation saved:', newDonation);
        } else if (type === 'payment') {
          const memberId = session.metadata.memberId;
          const newPayment = new Payment({
            member: memberId,
            amount,
            status: 'Paid',
          });
          await newPayment.save();
          console.log('Payment saved:', newPayment);
        }
      } catch (error) {
        console.error('Error saving to DB:', error);
      }
    }
    res.status(200).json({ received: true });
  }
);

export default router;
