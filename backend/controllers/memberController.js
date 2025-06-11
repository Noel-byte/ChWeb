import Member from '../models/Members.js';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
const YOUR_DOMAIN = 'http://localhost:5173';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createMember = async (req, res) => {


  console.log('Incoming form data: ',req.body)
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
    return res.status(400).json({ message: 'Single members should not include spouse info' });
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
    res.status(201).json({ message: 'Member registered successfully' ,member:newMember});
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
};

const getMember = async (req, res) => {
  //get the id from the request body
  const id = req.user.id; //from url params 
  const {isAdmin} = req.user
  console.log(isAdmin)

  try{
const member = await Member.findById(id)

  if(!member){
    return res.status(404).json({message:'Member not found'})
  }
  //then get user by using memberid
  console.log('member found:', member);
  res.status(200).json({member,isAdmin})
  }catch(error){
    console.log('error fetching member: ',error)
    res.status(500).json({message:'Server error'})
  }

  
};

const processPayment =  async (req, res) => {
  const {amount } = req.body;
  const id = req.user.id




  try {
    const user = await Member.findById(id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //create stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
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
      success_url: `${YOUR_DOMAIN}/payment-success`,
      cancel_url: `${YOUR_DOMAIN}/payment-canceled`,
    });

    res.status(200).json({ url: session.url});
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Something went wrong with Stripe' });
  }
}

const processDonation = async (req, res) => {
  const {amount } = req.body;

  try {
    // const user = await Member.findOne({ memberid });
    // console.log(user);

    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    //create stripe customer
    const customer = await stripe.customers.create({
      email: req.user.email,
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
              name: 'Church Donation',
            },
            unit_amount: amount * 100, // stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/donation-success`,
      cancel_url: `${YOUR_DOMAIN}/donation-canceled`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Something went wrong with Stripe' });
  }
};


export {createMember,getMember,processPayment,processDonation};
