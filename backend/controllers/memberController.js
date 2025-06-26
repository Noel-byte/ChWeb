import Member from '../models/Members.js';
import Payment from '../models/Payments.js';
import Donation from '../models/Donations.js';
import Post from '../models/Posts.js';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
// const YOUR_DOMAIN = 'http://localhost:5173';
// const YOUR_DOMAIN = process.env.CLIENT_URL;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createMember = async (req, res) => {
  // console.log('Incoming form data: ',req.body)
  const {
    memberid,
    firstname,
    middlename,
    lastname,
    email,
    phone,
    maritalstatus,
    city,
    province,
    postalcode,
    address,
    membershiptype,
    spouse, // this may be undefined or empty for single members
  } = req.body;

  // Optionally, add logic like:
  if (membershiptype === 'Single' && spouse) {
    return res
      .status(400)
      .json({ message: 'Single members should not include spouse info' });
  }
  const newMember = new Member({
    memberid,
    firstname,
    middlename,
    lastname,
    email,
    phone,
    maritalstatus,
    city,
    province,
    postalcode,
    address,
    membershiptype,
    spouse: membershiptype === 'Family' ? spouse : undefined,
  }); //created a new member

  //   console.log(newMember);

  const saveMember = await newMember.save(); //saves the new member to the database

  if (saveMember) {
    res
      .status(201)
      .json({ message: 'Member registered successfully', member: newMember });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
};

const getMember = async (req, res) => {
  if (req.user.notmember) {
    return res.status(200).json({ notmember: true });
  } else {
    const { isAdmin, member } = req.user;

    res.status(200).json({ member, isAdmin });
  }
};

const processPayment = async (req, res) => {
  const { amount } = req.body;
  const id = req.user.member._id;
   const protocol = req.protocol;
  const host = req.get('host');

  try {
    //create stripe customer
    const customer = await stripe.customers.create({
      email: req.user.member.email,
    });

    //create checkout session

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Annual Church Membership Fee',
            },
            unit_amount: amount * 100, // stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
     success_url: `${protocol}://${host}/donation-success`,
      cancel_url: `${protocol}://${host}/donation-cancel`,
      metadata: {
        type: 'payment',
        memberId: id.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Something went wrong with Stripe' });
  }
};

const processDonation = async (req, res) => {
  const { amount } = req.body;

   if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  if (!req.user?.email) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Church Donation',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode:'embedded',
      return_url:'https://faithbridge.onrender.com/return?session_id={CHECKOUT_SESSION_ID}',
      metadata: {
        type: 'donation',
        userEmail: req.user.email,
        googleid: req.user.googleid,
      },
    });

    res.status(200).json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Something went wrong with Stripe' });
  }
};

export { createMember, getMember, processPayment, processDonation, getPost };
