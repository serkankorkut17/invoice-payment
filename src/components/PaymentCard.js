import { useState } from 'react';
import Loading from './Loading';

const PaymentCard = props => {
  const [loading, setLoading] = useState(false);

  const invoiceType = props.payment.bill_type.charAt(0).toUpperCase() + props.payment.bill_type.slice(1);
  const invoiceNumber = props.payment._id.toString();
  const paymentAmount = props.payment.bill_amount;
  const paymentStatus = props.payment.payment_status === 'Paid' ? true : false;
  const dueDate = props.payment.due_date.split('T')[0];
  const paymentDate = props.payment.updatedAt.split('T')[0];

  const requestHandler = async () => {
    setLoading(true);
    const response = await fetch(`/api/user/${props.payment.user_id}/payments/${props.payment._id}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    // link.setAttribute('download', `${props.payment.user_id}_${paymentDate}.pdf`);
    link.setAttribute('download', 'receipt.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setLoading(false);
  }

  return (
    <div className="flex flex-col shadow-xl p-4 pt-4 bg-white mt-4">
      {loading && <Loading />}
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {invoiceType} Payment
        </p>
      </div>
      <div className="flex flex-row">
        <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
          Invoice Number:
        </p>
        <p className="text-lg  text-gray-900 dark:text-white">
          {invoiceNumber}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
          Payment Amount:
        </p>
        <p className="text-lg text-gray-900 dark:text-white">
          {paymentAmount}
          {String.fromCodePoint('0x20BA')}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
          Paid or Not:
        </p>
        <p className="text-lg  text-gray-900 dark:text-white">
          {paymentStatus ? 'Paid' : 'Not Paid'}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
            Due Date:
          </p>
          <p className="text-lg text-gray-900 dark:text-white">{dueDate}</p>
        </div>
        <div className="flex flex-row">
          <p className="text-lg font-medium text-gray-900 dark:text-white pr-1">
            Payment Date:
          </p>
          <p className="text-lg  text-gray-900 dark:text-white">
            {paymentDate}
          </p>
        </div>
      </div>
      <div className="flex flex-col pt-4">
        <button
          onClick={requestHandler}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Request Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
