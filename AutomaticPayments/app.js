const cron = require('node-cron');

// Schedule tasks to be run every 00.00 on the server.
cron.schedule('30 3 * * *', () => {
  console.log('running a task every day at midnight');
  getUsers().then(users => {
    console.log(users);
    users.forEach(async user => {
      const invoices = await getInvoices(user.user_id);
      const autoPayments = await getAutoPayments(user.user_id);

      invoices.forEach(async invoice => {
        const autoPayment = autoPayments.find(
          payment => payment.bill_type === invoice.bill_type
        );
        if (autoPayment) {
          console.log('autoPayment', autoPayment);
          const response = await fetch(
            `http://localhost:3000/api/user/${user.user_id}/payments`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                bill_id: invoice._id,
                payment_amount: autoPayment.payment_amount,
                payment_method: autoPayment.payment_method,
              }),
            }
          );
          const { message, invoiceId } = await response.json();
          console.log(message, invoiceId);
        }
      });
    });
  });
});

const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  return data.users;
};

const getInvoices = async user => {
  const now = new Date().toISOString().slice(0, 10);
  const response = await fetch(`http://localhost:3000/api/user/${user}/bills`);
  const { bills } = await response.json();
  //filter out paid invoices
  const filteredInvoices = bills.filter(
    bill => bill.payment_status !== 'Paid' && bill.due_date.slice(0, 10) === now
  );
  return filteredInvoices;

};

const getAutoPayments = async user => {
  const response = await fetch(
    `http://localhost:3000/api/user/${user}/automatic-payments`
  );
  const data = await response.json();
  return data.autoPayments;
};
