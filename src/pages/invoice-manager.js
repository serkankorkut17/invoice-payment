import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import InvoiceCard from '@/components/InvoiceCard';
import Loading from '@/components/Loading';
import { useUserContext } from '@/context/User';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import 'flowbite';


const InvoiceManager = () => {
  const [unsortedInvoices, setUnsortedInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    unpaid: false,
    dueSoon: false,
  });

  //const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user === null) return;
    //console.log('invoice manager', user);
    fetch(`/api/user/${user}/bills`)
      .then(data => data.json())
      .then(data => {
        //console.log(data);
        setUnsortedInvoices(data.bills);
        setInvoices(data.bills);
        setLoading(false);
      });
  }, [user]);

  const sortHandler = sortType => {
    if (sortType === 'type-AZ') {
      setInvoices(prevState => {
        //create a new array to avoid mutating the state
        const newInvoices = [...prevState];
        return newInvoices.sort((a, b) => {
          return a.bill_type.localeCompare(b.bill_type);
        });
      });
    } else if (sortType === 'type-ZA') {
      setInvoices(prevState => {
        const newInvoices = [...prevState];
        return newInvoices.sort((a, b) => {
          return b.bill_type.localeCompare(a.bill_type);
        });
      });
    } else if (sortType === 'date-earliest') {
      setInvoices(prevState => {
        const newInvoices = [...prevState];
        return newInvoices.sort((a, b) => {
          return new Date(a.due_date) - new Date(b.due_date);
        });
      });
    } else if (sortType === 'date-latest') {
      setInvoices(prevState => {
        const newInvoices = [...prevState];
        return newInvoices.sort((a, b) => {
          return new Date(b.due_date) - new Date(a.due_date);
        });
      });
    } else if (sortType === 'amount-LH') {
      setInvoices(prevState => {
        const newInvoices = [...prevState];
        return newInvoices.sort((a, b) => {
          return a.bill_amount - b.bill_amount;
        });
      });
    } else if (sortType === 'amount-HL') {
      setInvoices(prevState => {
        const newInvoices = [...prevState];
        return newInvoices.sort((a, b) => {
          return b.bill_amount - a.bill_amount;
        });
      });
    }
    //toggle dropdown
    const dropdown = document.getElementById('dropdownBottom');
    dropdown.classList.toggle('hidden');
  };

  const filterHandler = input => {
    // if (input === 'button') {
    //   const dropdown = document.getElementById('dropdownBgHover');
    //   dropdown.classList.toggle('hidden');
    // }
    if (input === 'unpaid') {
      setForm({ ...form, unpaid: !form.unpaid });
    }
    if (input === 'dueSoon') {
      setForm({ ...form, dueSoon: !form.dueSoon });
    }
  };

  useEffect(() => {
    let newInvoices = [...unsortedInvoices];
    console.log("unpaid", form.unpaid, "dueSoon", form.dueSoon);
    if (form.unpaid) {
      newInvoices = newInvoices.filter(
        invoice => invoice.payment_status !== 'Paid'
      );
    }
    if (form.dueSoon) {
      newInvoices = newInvoices.filter(invoice => {
        const difference = new Date(invoice.due_date).getTime() - Date.now();
        return difference < 604800000 && difference > -86400000;
      });
    }
    setInvoices(newInvoices);
  }, [form]);

  

  return (
    <>
      {loading && <Loading />}
      <Layout title="Invoice Manager" />
      <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <div className="flex flex-col p-4 md:p-5 w-auto lg:w-2/5">
          <div className="flex flex-row items-center justify-between mt-8">
            <p className="text-lg  text-gray-900 dark:text-white">
              {invoices.length} invoices
            </p>
            <div className="flex flex-row items-center">
              {/* FILTER BUTTON */}

              <button
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center cursor-pointer mr-2"
                type="button"
                onClick={() => filterHandler('button')}
              >
                Filter by{' '}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownBgHover"
                className="z-10 hidden w-48 bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownBgHoverButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="unpaid"
                        type="checkbox"
                        onClick={() => {
                          // setForm(prevForm => ({ ...prevForm, unpaid: !prevForm.unpaid }));
                          // setForm({ ...form, unpaid: !form.unpaid });
                          filterHandler('unpaid');
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="unpaid"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Only Unpaid
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="dueSoon"
                        type="checkbox"
                        onClick={() => {
                          // setForm(prevForm => ({ ...prevForm, dueSoon: !prevForm.dueSoon }));
                          // setForm({ ...form, dueSoon: !form.dueSoon });
                          filterHandler('dueSoon');
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="dueSoon"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Due Soon
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              {/* SORT BUTTON */}
              <button
                id="dropdownBottomButton"
                data-dropdown-toggle="dropdownBottom"
                data-dropdown-placement="bottom"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center cursor-pointer"
                type="button"
                // onClick={sortHandler}
              >
                Sort by{' '}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownBottom"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownBottomButton"
                >
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      onClick={() => sortHandler('type-AZ')}
                    >
                      Invoice Type (A-Z)
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      onClick={() => sortHandler('type-ZA')}
                    >
                      Invoice Type (Z-A)
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      onClick={() => sortHandler('amount-LH')}
                    >
                      Amount (Low to High)
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      onClick={() => sortHandler('amount-HL')}
                    >
                      Amount (High to Low)
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      onClick={() => sortHandler('date-earliest')}
                    >
                      Due Date (Earliest to Latest)
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                      onClick={() => sortHandler('date-latest')}
                    >
                      Due Date (Latest to Earliest)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">Due Invoices List</h1>
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
