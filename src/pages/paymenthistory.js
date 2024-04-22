import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PaymentCard from '@/components/PaymentCard';

const PaymentHistory = () => {
	const [payments, setPayments] = useState([]);

  useEffect(() => {
    const userId = "serkan";
    console.log(userId);
    fetch(`/api/user/${userId}/payments`)	
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setPayments(data.payments);
      });
  }, []);

  return (
    <>
      <Layout title="Payment History" />
      <main className="flex min-h-screen flex-col items-center p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <div className="flex flex-col p-4 md:p-5 w-auto lg:w-2/5">
        {payments.map((payment) => (
					<PaymentCard key={payment._id} payment={payment} />
				))}
        </div>
      </main>
    </>
  );
};

export default PaymentHistory;
