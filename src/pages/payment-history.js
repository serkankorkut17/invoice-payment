import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PaymentCard from '@/components/PaymentCard';
import Loading from '@/components/Loading';
import { useUserContext } from '@/context/User';
import { useRouter } from 'next/router';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  //const router = useRouter();

  useEffect(() => {
    if (user === null) return;
    fetch(`/api/user/${user}/payments`)
      .then(data => data.json())
      .then(data => {
        //console.log(data);
        setPayments(data.payments);
        setLoading(false);
      });
  }, [user]);

  return (
    <>
      {loading && <Loading />}
      <Layout title="Payment History" />
      <main className="flex min-h-screen flex-col items-center p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <div className="flex flex-col p-4 md:p-5 w-auto lg:w-2/5">
          {payments &&
            payments.map(payment => (
              <PaymentCard key={payment._id} payment={payment} />
            ))}
          {payments.length === 0 && (
            <div className="flex flex-col items-center justify-center p-4 md:p-5 w-auto lg:w-2/5">
              <h1 className="text-2xl font-bold mt-8">No Payments Found</h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default PaymentHistory;
