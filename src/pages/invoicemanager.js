import React from 'react';
import Layout from '@/components/Layout';

const InvoiceManager = () => {
  return (
    <>
      <Layout title="Invoice Manager" />
      <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col p-4 md:p-5 w-auto lg:w-2/5">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold mt-8">Due Invoices List</h1>
          </div>
          <div className="flex flex-col shadow-lg p-4 pt-4 bg-lime-500">
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">Invoice Type:</p>
              <p className="text-lg text-gray-900 dark:text-white">Internet</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Invoice Number:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">#12345</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Payment Amount:
              </p>
              <p className="text-lg text-gray-900 dark:text-white">$100</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">Due Date:</p>
              <p className="text-lg text-gray-900 dark:text-white">12/12/2021</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-gray-900 dark:text-white">Paid or Not:</p>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default InvoiceManager;
