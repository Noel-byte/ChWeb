import Member from '../models/Members.js';

const createMember = async (req, res) => {

    console.log('Received body: ',req.body)
  const newMember = new Member(req.body); //created a new member

//   console.log(newMember);

  const saveMember = await newMember.save(); //saves the new member to the database

  if (saveMember) {
    res.status(201).json({message:'Member registered successfully'});
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
};

export default createMember;
