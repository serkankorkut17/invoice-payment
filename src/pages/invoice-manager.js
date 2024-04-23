import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import InvoiceCard from '@/components/InvoiceCard';
import Loading from '@/components/Loading';
import { useUserContext } from '@/context/User';
import { useRouter } from 'next/router';
import Link from 'next/link';

const InvoiceManager = () => {
  const [invoices, setInvoices] = useState([]);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  //const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user === null) return;
    //console.log('invoice manager', user);
    fetch(`/api/user/${user}/bills`)
      .then(data => data.json())
      .then(data => {
        //console.log(data);
        setInvoices(data.bills);
        setLoading(false);
      });
  }, [user]);

  return (
    <>
      {loading && <Loading />}
      <Layout title="Invoice Manager" />
      <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <div className="flex flex-col p-4 md:p-5 w-auto lg:w-2/5">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold mt-8">Due Invoices List</h1>
          </div>
          {invoices &&
            invoices.map(invoice => (
              <InvoiceCard key={invoice._id} invoice={invoice} />
            ))}
          {invoices.length === 0 && (
            <div className="flex flex-col items-center justify-center p-4 md:p-5 w-auto lg:w-2/5">
              <h1 className="text-2xl font-bold">No Invoices Found</h1>
            </div>
          )}
          <div className="flex flex-col">
            <Link
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center cursor-pointer"
              href="/payment-history"
            >
              Payment History
            </Link>
            <Link
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center cursor-pointer"
              href="/auto-bill-payments"
            >
              Auto Bill Payments
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default InvoiceManager;
