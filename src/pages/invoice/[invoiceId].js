import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { useUserContext } from '@/context/User';
import { useRouter } from 'next/router';

const InvoiceDetails = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  const [invoiceType, setInvoiceType] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);

  const [form, setForm] = useState({
    amount: '',
    method: 'Credit/Debit Card',
  });

  useEffect(() => {
    if (router.query.invoiceId && user) {
      fetch(`/api/user/${user}/bills/${router.query.invoiceId}`)
        .then(data => data.json())
        .then(data => {
          //console.log(data);
          setInvoiceType(
            data.bill.bill_type.charAt(0).toUpperCase() +
              data.bill.bill_type.slice(1)
          );
          setInvoiceNumber(data.bill._id.toString());
          setPaymentAmount(data.bill.bill_amount);
          setDueDate(data.bill.due_date.split('T')[0]);
          setPaymentStatus(data.bill.payment_status === 'Paid' ? true : false);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [router.query.invoiceId, user]);

  const automaticBillPaymentHandler = () => {
    router.push('/auto-bill-payments');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { amount, method } = form;
    if (amount === '' || method === '' || invoiceNumber === '') {
      alert('Please fill in all fields');
      return;
    }
    //fetch api/user/:userId/payments
    const response = await fetch(`/api/user/${user}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bill_id: invoiceNumber,
        payment_amount: amount,
        payment_method: method,
      }),
    });

    const { message } = await response.json();

    if (message === 'Payment successful') {
      alert('Payment successful');
      setForm({ amount: '' });
      fetch(`/api/user/${user}/bills/${router.query.invoiceId}`)
        .then(data => data.json())
        .then(data => {
          //console.log(data);
          setInvoiceType(
            data.bill.bill_type.charAt(0).toUpperCase() +
              data.bill.bill_type.slice(1)
          );
          setInvoiceNumber(data.bill._id.toString());
          setPaymentAmount(data.bill.bill_amount);
          setDueDate(data.bill.due_date.split('T')[0]);
          setPaymentStatus(data.bill.payment_status === 'Paid' ? true : false);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert(message);
      setForm({ ...form });
    }
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <>
      {loading && <Loading />}
      <Layout title="Invoice Details" />
      <main className="flex min-h-screen flex-col items-center p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <div className="flex flex-col px-4 md:px-5 pt-4 md:pt-5 w-auto lg:w-2/5">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold mt-8">Invoice Information</h1>
          </div>
          {/* ------------------------------------------------ */}
          <div className="flex flex-col shadow-xl p-4 pt-4 bg-white">
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Invoice Type:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {invoiceType}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Invoice Number:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {invoiceNumber}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Payment Amount:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {paymentAmount}
                {String.fromCodePoint('0x20BA')}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Due Date:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">{dueDate}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Paid or Not:
              </p>
              {paymentStatus ? (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        {/* ---------------------------------------- */}
        <form onSubmit={handleSubmit} className="px-4 md:px-5 w-auto lg:w-2/5">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold mt-8">Payment Options</h1>
          </div>
          <div className="flex flex-col shadow-xl p-4">
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-lg font-bold">
                Payment Amount
              </label>
              <input
                type="number"
                onChange={e => handleFormFieldChange('amount', e)}
                value={form.amount}
                id="amount"
                name="amount"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="invoiceType" className="text-lg font-bold">
                Payment Method
              </label>
              <select
                id="method"
                onChange={e => handleFormFieldChange('method', e)}
                value={form.method}
                name="method"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="BKM Express">BKM Express</option>
                <option value="Paycell">Paycell</option>
                <option value="GPay">GPay</option>
              </select>
            </div>
            <div className="flex flex-col pt-4">
              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Pay Now
              </button>
            </div>
            <button
              type="button"
              onClick={automaticBillPaymentHandler}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Set Automatic Bill Payment Order
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default InvoiceDetails;
