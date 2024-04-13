import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId } = req.query;
      const autoPayments = await mongoose.models.AutomaticPayment.find({
        user_id: userId,
      });
      res.status(200).json({ autoPayments });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      const { user_id, bill_type, payment_amount, payment_method, frequency } =
        req.body;

      const newAutoPayment = new mongoose.models.AutomaticPayment({
        user_id,
        bill_type,
        payment_amount,
        payment_method,
        frequency,
      });

      await newAutoPayment.save();
      res
        .status(201)
        .json({ message: 'Automatic Payment created', newAutoPayment });
    }
    //* DELETE METHOD *//
    if (req.method === 'DELETE') {
        const { userId } = req.query;
        const { autoPayId } = req.body;
        const autoPayment = await mongoose.models.AutomaticPayment.findOne({
            user_id: userId,
            _id: autoPayId,
        });
        if (!autoPayment) {
            res.status(404).json({ message: 'Automatic Payment not found' });
            return;
        }
        await autoPayment.remove();
        res.status(200).json({ message: 'Automatic Payment deleted' });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
