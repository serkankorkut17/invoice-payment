import mongoose from 'mongoose';
import connectDatabase from '@/utils/database';
import AutomaticPayment from '@/models/automatic_payment';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId } = req.query;
      const autoPayments = await AutomaticPayment.find({
        user_id: userId,
      });
      res.status(200).json({ autoPayments });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      const { userId } = req.query;
      const user_id = userId;
      const { bill_type, payment_amount, payment_method, frequency } = req.body;

      if (isNaN(payment_amount)) {
        res.status(400).json({ message: 'Payment amount must be a number' });
        return;
      }

      const newAutoPayment = new AutomaticPayment({
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
      const autoPayment = await AutomaticPayment.findOne({
        user_id: userId,
        _id: autoPayId,
      });
      if (!autoPayment) {
        res.status(404).json({ message: 'Automatic Payment not found' });
        return;
      }
      await AutomaticPayment.deleteOne({ _id: autoPayId });
      res.status(200).json({ message: 'Automatic Payment deleted' });
    }
    //* PUT METHOD *//
    if (req.method === 'PUT') {
      const { userId } = req.query;
      const { autoPayId } = req.body;
      const autoPayment = await AutomaticPayment.findOne({
        user_id: userId,
        _id: autoPayId,
      });
      if (!autoPayment) {
        res.status(404).json({ message: 'Automatic Payment not found' });
        return;
      }
      const { payment_amount, payment_method, frequency } = req.body;

      if (isNaN(payment_amount)) {
        res.status(400).json({ message: 'Payment amount must be a number' });
        return;
      }
      autoPayment.payment_amount = payment_amount;
      autoPayment.payment_method = payment_method;
      autoPayment.frequency = frequency;
      await autoPayment.save();
      res.status(200).json({ message: 'Automatic Payment updated' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
