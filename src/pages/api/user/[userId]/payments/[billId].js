import { connectDatabase } from '@/utils/sequelize-config';
import Invoice from '@/models/invoice';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId, billId } = req.query;
      const payment = await Invoice.findOne({
        where: {
          user_id: userId,
          invoice_id: billId,
        },
      });

      const doc = new PDFDocument();
      const stream = doc.pipe(new Readable().wrap(res));

      doc.fontSize(30).text('Payment Receipt', { align: 'center' });
      doc.moveDown();
      doc.fontSize(25).text('Payment Details', { underline: true });
      doc.moveDown();
      doc.fontSize(20);
      doc.text(`Invoice Type: ${payment.bill_type.toString()}`);
      doc.moveDown();
      doc.text(`Invoice ID: ${payment.invoice_id.toString()}`);
      doc.moveDown();
      doc.text(`User ID: ${payment.user_id.toString()}`);
      doc.moveDown();
      doc.text(`Amount: ${payment.bill_amount.toString()}TL`);
      doc.moveDown();
      doc.text(`Due Date: ${payment.due_date.toString()}`);
      doc.moveDown();
      doc.text(`Payment Status: ${payment.payment_status.toString()}`);

      doc.end();
      stream.on('finish', () => {
        // The PDF has been written
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
        res.end(stream);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
