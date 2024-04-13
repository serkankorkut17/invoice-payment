import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId } = req.query;
      const bills = await mongoose.models.Invoice.find({ user_id: userId });
      res.status(200).json({ bills });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      const { user_id, bill_type, bill_amount, due_date } = req.body;
      payment_status = 'Unpaid';
      const invoice = new mongoose.models.Invoice({
        user_id,
        bill_type,
        bill_amount,
        due_date,
        payment_status,
      });
      await invoice.save();
      const invoiceId = invoice._id.toString();

      res.status(201).json({ message: 'Invoice created', invoice, billID: invoiceId });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
