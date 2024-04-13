import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      // get specific user's specific bill
      const { userId, billId } = req.query;
      const bill = await mongoose.models.Invoice.findOne({
        user_id: userId,
        _id: billId,
      });
      if (!bill) {
        res.status(404).json({ message: 'Bill not found' });
        return;
      }
        res.status(200).json({ bill });
    }
    //* PUT METHOD *//
    if (req.method === 'PUT') {
        // update specific user's specific bill
        const { userId, billId } = req.query;
        const { bill_type, bill_amount, due_date, payment_status } = req.body;
        const bill = await mongoose.models.Invoice.findOne({
            user_id: userId,
            _id: billId,
        });
        if (!bill) {
            res.status(404).json({ message: 'Bill not found' });
            return;
        }
        if (bill_type) bill.bill_type = bill_type;
        if (bill_amount) bill.bill_amount = bill_amount;
        if (due_date) bill.due_date = due_date;
        if (payment_status) bill.payment_status = payment_status;
        await bill.save();
        res.status(200).json({ message: 'Bill updated', bill });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
