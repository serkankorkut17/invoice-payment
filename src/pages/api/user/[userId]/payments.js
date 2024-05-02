import { connectDatabase } from '@/utils/sequelize-config';
import Invoice from '@/models/invoice';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId } = req.query;
      const payments = await Invoice.findAll({
        where: {
          user_id: userId,
          payment_status: 'Paid',
        },
      });
      res.status(200).json({ payments });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      let { bill_id, payment_amount, payment_method } = req.body;

      const invoice = await Invoice.findOne({
        where: {
          invoice_id: bill_id,
        },
      });

      if (!invoice) {
        res.status(404).json({ message: 'Invoice not found' });
        return;
      } //check if payment_amount is a number
      if (isNaN(payment_amount)) {
        res.status(400).json({ message: 'Payment amount must be a number' });
        return;
      }
      payment_amount = Number(payment_amount);

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
        res
          .status(201)
          .json({
            message: 'Payment successful',
            invoiceId: invoice.invoice_id.toString(),
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
