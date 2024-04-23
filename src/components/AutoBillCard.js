import React from 'react';
import { useRouter } from 'next/router';

const AutoBillCard = props => {
  const router = useRouter();

  const invoiceType =
    props.autoPayment.bill_type.charAt(0).toUpperCase() +
    props.autoPayment.bill_type.slice(1);
  const frequency =
    props.autoPayment.frequency.charAt(0).toUpperCase() +
    props.autoPayment.frequency.slice(1);
  const paymentMethod = props.autoPayment.payment_method;
  const paymentAmount = props.autoPayment.payment_amount;

  const editAutoPaymentHandler = () => {
    router.push(`/auto-bill-payment/${props.autoPayment._id}`);
  };

  const deleteAutoPaymentHandler = async () => {
    const response = await fetch(`/api/user/${props.user}/automatic-payments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ autoPayId: props.autoPayment._id }),
    });
    const {message} = await response.json();
    if (message === 'Automatic Payment deleted') {
      alert('Automatic Payment deleted');
      fetch(`/api/user/${props.user}/automatic-payments`)
        .then(data => data.json())
        .then(data => {
          props.setAutoPayments(data.autoPayments);
        });
    } else {
      alert(message);
    }
  };

  return (
    <div className="flex flex-col shadow-xl p-4 pt-4 bg-white mt-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {invoiceType}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
          Frequency:
        </p>
        <p className="text-lg  text-gray-900 dark:text-white">{frequency}</p>
      </div>
      <div className="flex flex-row">
        <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
          Payment Method:
        </p>
        <p className="text-lg text-gray-900 dark:text-white">{paymentMethod}</p>
      </div>
      <div className="flex flex-row">
        <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
          Amount:
        </p>
        <p className="text-lg  text-gray-900 dark:text-white">
          {paymentAmount}
          {String.fromCodePoint('0x20BA')}
        </p>
      </div>
      <div className="flex flex-row justify-end items-center">
        <button
          onClick={editAutoPaymentHandler}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-2 min-w-16"
        >
          Edit
        </button>
        <button
          onClick={deleteAutoPaymentHandler}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-16"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AutoBillCard;
