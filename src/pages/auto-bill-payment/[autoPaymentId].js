import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useUserContext } from '@/context/User';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

const ManageAutoBillPayment = () => {
  const router = useRouter();
  const { user } = useUserContext();

  const [billType, setBillType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [autoPayId, setAutoPayId] = useState('');

  const [form, setForm] = useState({
    frequency: '',
    paymentMethod: '',
    paymentAmount: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.autoPaymentId && user) {
      const autoPaymentId = router.query.autoPaymentId;
      fetch(`/api/user/${user}/automatic-payments`)
        .then(data => data.json())
        .then(data => {
          //console.log(data);
          const autoPayment = data.autoPayments.find(
            autoPayment => autoPayment._id === autoPaymentId
          );
          setBillType(
            autoPayment.bill_type.charAt(0).toUpperCase() +
              autoPayment.bill_type.slice(1)
          );
          setFrequency(
            autoPayment.frequency.charAt(0).toUpperCase() +
              autoPayment.frequency.slice(1)
          );
          setPaymentMethod(autoPayment.payment_method);
          setPaymentAmount(autoPayment.payment_amount);
          setAutoPayId(autoPayment._id);
          setForm({
            frequency: autoPayment.frequency,
            paymentMethod: autoPayment.payment_method,
            paymentAmount: autoPayment.payment_amount,
          });

          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [router.query.invoiceId, user]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { frequency, paymentMethod, paymentAmount } = form;

    if (frequency === '' || paymentMethod === '' || paymentAmount === '') {
      alert('Please fill in all fields');
      return;
    }

    const response = await fetch(`/api/user/${user}/automatic-payments`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        autoPayId: autoPayId,
        frequency: frequency,
        payment_method: paymentMethod,
        payment_amount: paymentAmount,
      }),
    });
    const { message } = await response.json();
    if (message === 'Automatic Payment updated') {
      alert('Automatic Payment updated');
      //////////////////////////
      const autoPaymentId = router.query.autoPaymentId;
      fetch(`/api/user/${user}/automatic-payments`)
        .then(data => data.json())
        .then(data => {
          //console.log(data);
          const autoPayment = data.autoPayments.find(
            autoPayment => autoPayment._id === autoPaymentId
          );
          setBillType(
            autoPayment.bill_type.charAt(0).toUpperCase() +
              autoPayment.bill_type.slice(1)
          );
          setFrequency(
            autoPayment.frequency.charAt(0).toUpperCase() +
              autoPayment.frequency.slice(1)
          );
          setPaymentMethod(autoPayment.payment_method);
          setPaymentAmount(autoPayment.payment_amount);
          setAutoPayId(autoPayment._id);
          setForm({
            frequency: autoPayment.frequency,
            paymentMethod: autoPayment.payment_method,
            paymentAmount: autoPayment.payment_amount,
          });

          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert(message);
    }
  };

  const deleteAutoPaymentHandler = async () => {
    const response = await fetch(`/api/user/${user}/automatic-payments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ autoPayId: autoPayId }),
    });
    console.log(response);
    const { message } = await response.json();
    console.log(message);
    if (message === 'Automatic Payment deleted') {
      router.push('/auto-bill-payments');
    } else {
      alert(message);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Layout title="Admin Invoice Registration" />
      <main className="flex min-h-screen flex-col items-center p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <div className="pt-4 md:pt-5 px-4 md:px-5 w-auto lg:w-2/5 ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">Existing Order Details</h1>
          </div>
          {/* -------------- */}
          <div className="flex flex-col shadow-xl p-4 pt-4 bg-white mt-4">
            <div className="flex flex-row">
              <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
                Invoice Type:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {billType}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
                Payment Amount:
              </p>
              <p className="text-lg  text-gray-900 dark:text-white">
                {paymentAmount}
                {String.fromCodePoint('0x20BA')}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
                Payment Frequency:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">
                {frequency}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
                Payment Method:
              </p>
              <p className="text-lg  text-gray-900 dark:text-white">
                {paymentMethod}
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="pb-4 md:pb-5 px-4 md:px-5 w-auto lg:w-2/5 "
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">Edit Options</h1>
          </div>
          <div className="flex flex-col shadow-xl p-4">
            <div className="flex flex-col">
              <label htmlFor="frequency" className="text-lg font-bold">
                Frequency
              </label>
              <select
                id="frequency"
                onChange={e => handleFormFieldChange('frequency', e)}
                value={form.frequency}
                name="frequency"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="paymentMethod" className="text-lg font-bold">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                onChange={e => handleFormFieldChange('paymentMethod', e)}
                value={form.paymentMethod}
                name="paymentMethod"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="BKM Express">BKM Express</option>
                <option value="Paycell">Paycell</option>
                <option value="GPay">GPay</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="paymentAmount" className="text-lg font-bold">
                Payment Amount
              </label>
              <input
                type="number"
                onChange={e => handleFormFieldChange('paymentAmount', e)}
                value={form.paymentAmount}
                id="paymentAmount"
                name="paymentAmount"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              />
            </div>
            <div className="flex flex-col pt-4">
              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Confirm
              </button>
              <button
                onClick={deleteAutoPaymentHandler}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default ManageAutoBillPayment;
