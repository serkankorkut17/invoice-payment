import connectDatabase from '@/utils/database';
import Invoice from '@/models/invoice';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function handler(req, res) {
  try {
    await connectDatabase();
    //* GET METHOD *//
    if (req.method === 'GET') {
      const { userId, billId } = req.query;
      const payment = await Invoice.findOne({ user_id: userId, _id: billId });

      const docDefinition = {
        content: [
          { text: 'Payment Receipt', style: 'header' },
          { text: `Invoice ID: ${payment._id}`, style: 'subheader' },
          { text: `Amount: $${payment.bill_amount}`, style: 'subheader' },
          { text: `Due Date: ${payment.due_date}`, style: 'subheader' },
          {
            text: `Payment Status: ${payment.payment_status}`,
            style: 'subheader',
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],
          },
        },
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);

      pdfDocGenerator.getBuffer(buffer => {
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(buffer);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
