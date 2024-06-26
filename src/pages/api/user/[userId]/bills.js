import { connectDatabase } from '@/utils/sequelize-config';
import Invoice from '@/models/invoice';


export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId } = req.query;

      const bills = await Invoice.findAll({
        where: {
          user_id: userId,
        },
      });
      res.status(200).json({ bills });
    }
    //* POST METHOD *//
    if (req.method === 'POST') {
      //create a new bill
      const { userId } = req.query;
      const user_id = userId;
      let { bill_type, bill_amount, due_date } = req.body;
      due_date = new Date(due_date);
      const payment_status = 'Unpaid';

      if (isNaN(bill_amount)) {
        res.status(400).json({ message: 'Bill amount must be a number' });
        return;
      }
      const newInvoice = new Invoice({ user_id, bill_type, bill_amount, due_date, payment_status });
      await newInvoice.save();
      const invoiceId = newInvoice.invoice_id.toString();

      res.status(201).json({ message: 'Invoice created', newInvoice, billID: invoiceId });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
