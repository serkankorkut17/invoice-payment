import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useUserContext } from '@/context/User';
import AutoBillCard from '@/components/AutoBillCard';

const AutoBillPayments = () => {
  const { user } = useUserContext();
  const [autoPayments, setAutoPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    billType: 'electricity',
    frequency: 'monthly',
    paymentMethod: 'Credit/Debit Card',
    paymentAmount: '',
  });

  useEffect(() => {
    fetch(`/api/user/${user}/automatic-payments`)
      .then(data => data.json())
      .then(data => {
        //console.log(data);
        setAutoPayments(data.autoPayments);
        setLoading(false);
      });
  }, []);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { billType, frequency, paymentMethod, paymentAmount } = form;
    if (
      billType === '' ||
      frequency === '' ||
      paymentMethod === '' ||
      paymentAmount === ''
    ) {
      alert('Please fill in all fields');
      return;
    }

    const response = await fetch(`/api/user/${user}/automatic-payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bill_type: billType,
        frequency,
        payment_method: paymentMethod,
        payment_amount: paymentAmount,
      }),
    });
    const { message, newAutoPayment } = await response.json();
    if (message === 'Automatic Payment created') {
      alert('Automatic Payment created');
      setForm({
        ...form,
        paymentAmount: '',
      });
      console.log(message, newAutoPayment);
      fetch(`/api/user/${user}/automatic-payments`)
        .then(data => data.json())
        .then(data => {
          //console.log(data);
          setAutoPayments(data.autoPayments);
        });
    } else {
      alert(message);
      setForm({ ...form });
    }
  };

  return (
    <>
      <Layout title="Auto Bill Payment" />
      <main className="flex min-h-screen flex-col items-center p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <form
          onSubmit={handleSubmit}
          className="pt-4 md:pt-5 px-4 md:px-5 w-auto lg:w-2/5 "
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">New Bill Payment Form</h1>
          </div>
          <div className="flex flex-col shadow-xl p-4">
            <div className="flex flex-col">
              <label htmlFor="billType" className="text-lg font-bold">
                Bill Type
              </label>
              <select
                id="billType"
                onChange={e => handleFormFieldChange('billType', e)}
                value={form.billType}
                name="billType"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="internet">Internet</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
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
                Amount
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
            </div>
          </div>
        </form>
        <div className="pb-4 md:pb-5 px-4 md:px-5 w-auto lg:w-2/5 ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">
              Existing Orders Management
            </h1>
          </div>
          {autoPayments &&
            autoPayments.map(autoPayment => (
              <AutoBillCard
                key={autoPayment._id}
                autoPayment={autoPayment}
                setAutoPayments={setAutoPayments}
                user={user}
              />
            ))}
          {loading && (
            <p className="text-lg text-gray-900 dark:text-white">Loading...</p>
          )}
          {autoPayments.length === 0 && !loading && (
            <p className="text-lg text-gray-900 dark:text-white">
              No automatic payments found
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default AutoBillPayments;
