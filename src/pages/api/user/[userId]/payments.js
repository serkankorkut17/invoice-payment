import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId } = req.query;
      const payments = await mongoose.models.Invoice.find({ user_id: userId });
      res.status(200).json({ payments });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      const { bill_id, payment_amount, payment_method } = req.body;

      const invoice = await mongoose.models.Invoice.findOne({
        _id: bill_id,
      });

      if (invoice.payment_status === 'Paid') {
        res.status(400).json({ message: 'Bill already paid' });
        return;
      } else if (invoice.bill_amount < payment_amount) {
        res.status(400).json({ message: 'Payment amount exceeds bill amount' });
        return;
      } else if (invoice.bill_amount > payment_amount) {
        res
          .status(400)
          .json({ message: 'Payment amount is less than bill amount' });
        return;
      } else {
        invoice.payment_status = 'Paid';
        await invoice.save();
      }
      res
        .status(201)
        .json({ message: 'Payment successful', paymentID: paymentId });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
