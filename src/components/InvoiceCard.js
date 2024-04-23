import React from 'react';
import Link from 'next/link';

const InvoiceCard = props => {
  const invoiceType = props.invoice.bill_type.charAt(0).toUpperCase() + props.invoice.bill_type.slice(1);
  const invoiceNumber = props.invoice._id.toString();
  const paymentAmount = props.invoice.bill_amount;
  const dueDate = props.invoice.due_date.split('T')[0];
  const paymentStatus = props.invoice.payment_status === 'Paid' ? true : false;

  return (
    <Link
      className={`flex flex-col shadow-xl p-4 pt-4 mb-2 cursor-pointer ${
        paymentStatus ? 'bg-lime-500' : 'bg-white'
      }`}
      href={`/invoice/${invoiceNumber}`}
    >
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Invoice Type:
        </p>
        <p className="text-lg text-gray-900 dark:text-white">{invoiceType}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Invoice Number:
        </p>
        <p className="text-lg text-gray-900 dark:text-white">{invoiceNumber}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Payment Amount:
        </p>
        <p className="text-lg text-gray-900 dark:text-white">
        {paymentAmount}{String.fromCodePoint("0x20BA")}
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
    </Link>
  );
};

export default InvoiceCard;
