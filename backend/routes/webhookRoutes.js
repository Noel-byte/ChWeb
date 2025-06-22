import express from 'express';
import Stripe from 'stripe';
import Donation from '../models/Donations.js'; 
import bodyParser from 'body-parser';

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

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Get your custom metadata
      const email = session.metadata.userEmail;
      const amount = session.amount_total / 100;
      const googleid = session.metadata.googleid;

      console.log(`✅ Payment received from ${email} for $${amount}`);

      // Save donation
      const donation = new Donation({
        googleid,
        email,
        amount,
      });

      try {
        await donation.save();
        console.log(`✅ Donation saved to DB`);
      } catch (err) {
        console.error('Error saving donation:', err);
      }
    }

    res.status(200).json({ received: true });
  }
);

export default router;
