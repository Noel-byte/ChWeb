import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Member from '../models/Members.js';





passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
async (accessToken,refreshToken,profile,done)=>{
    const email = profile.emails[0].value;
console.log('passport.js loaded, client ID:', process.env.GOOGLE_CLIENT_ID);
    try{
        let member = await Member.findOne({email})
        if(!member){
            return done(null,false)
        }

        //save googleId if not already saved
        if(!member.googleId){
            member.googleId=profile.id
            await member.save()
        }

        return done(null,member)
    }catch(error){
        return done(error,false)
    }
}
)
);


export default passport;