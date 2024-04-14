import mongoose from 'mongoose';
import connectDatabase from '@/utils/database';
import User from '@/models/user';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      //find all users
      const users = await User.find();
      res.status(200).json({ users });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      //create a new user
      const { user_id } = req.body;
      const newUser = new User({ user_id });
      await newUser.save();
      res.status(201).json({ message: 'User created', user: newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
