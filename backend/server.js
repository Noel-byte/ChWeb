import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import memberRoute from './routes/memberRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/members', memberRoute);

// app.get('/',(req,res)=>{
//     res.send('API is running...')
// })

//connect ot MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server is running on port ${[PORT]}`));
  })
  .catch((err) => console.log(err));
