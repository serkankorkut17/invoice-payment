import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { useUserContext } from '@/context/User';

export default function Home(props) {
  const [users, setUsers] = useState([]);
  const { user, login } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    dueDate: '',
    invoiceType: '',
    recipient: '',
    activeUser: '',
  });

  useEffect(() => {
    fetch('/api/users')
      .then(data => data.json())
      .then(data => {
        //console.log(data);
        setUsers(data.users);
        setForm({ ...form, recipient: data.users[0].user_id, invoiceType: 'electricity' });
        //setForm({ ...form, activeUser: data.users[0].user_id});
      });
  }, []);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const difference = new Date(form.dueDate).getTime() - Date.now();
    const { amount, dueDate, invoiceType, recipient } = form;

    if (
      amount === '' ||
      dueDate === '' ||
      invoiceType === '' ||
      recipient === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    if (difference < 0) {
      alert('Due date must be in the future');
      return;
    }

    //fetch api/user/:userId/bills
    const response = await fetch(`/api/user/${recipient}/bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bill_type: invoiceType,
        bill_amount: amount,
        due_date: dueDate,
      }),
    });

    const { message, newInvoice, billID } = await response.json();

    if (message === 'Invoice created') {
      alert('Invoice created');
      setForm({ amount: '', dueDate: '', invoiceType: '', recipient: '' });
      console.log(message, newInvoice, billID);
    } else {
      alert(message);
      setForm({ ...form });
    }
  };

  const newRecipientHandler = () => {
    setOpenModal(true);
  };

  const activeUserHandler = () => {
    login(form.activeUser);
  };

  return (
    <>
      <Layout title="Admin Invoice Registration" />
      <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2">
        <form onSubmit={handleSubmit} className="p-4 md:p-5 w-auto lg:w-2/5 ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">Invoice Details</h1>
          </div>
          <div className="flex flex-col shadow-xl p-4">
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-lg font-bold">
                Amount
              </label>
              <input
                type="number"
                onChange={e => handleFormFieldChange('amount', e)}
                value={form.amount}
                id="amount"
                name="amount"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="dueDate" className="text-lg font-bold">
                Due Date
              </label>
              <input
                type="date"
                onChange={e => handleFormFieldChange('dueDate', e)}
                value={form.dueDate}
                id="dueDate"
                name="dueDate"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="invoiceType" className="text-lg font-bold">
                Invoice Type
              </label>
              <select
                id="invoiceType"
                onChange={e => handleFormFieldChange('invoiceType', e)}
                value={form.invoiceType}
                name="invoiceType"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="internet">Internet</option>
                <option value="phone">Phone</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">Recipient Selection</h1>
          </div>
          <div className="flex flex-col shadow-xl p-4 pt-4">
            <div className="flex flex-col">
              <label htmlFor="recipient" className="text-lg font-bold">
                Select Recipient
              </label>
              <select
                id="recipient"
                onChange={e => handleFormFieldChange('recipient', e)}
                value={form.recipient}
                name="recipient"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.user_id}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={newRecipientHandler}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Add New Recipient
              </button>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <button
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit Invoice
            </button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-8">Active User Selection</h1>
          </div>
          <div className="flex flex-col shadow-xl p-4">
            <div className="flex flex-col">
              <label htmlFor="user" className="text-lg font-bold">
                Select Active User
              </label>
              <select
                id="activeUser"
                onChange={e => handleFormFieldChange('activeUser', e)}
                value={form.activeUser ? form.activeUser : user ? user : ''}
                name="activeUser"
                className="p-2 border border-gray-200 rounded-sm mt-2 shadow-md"
              >
                {users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.user_id}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={activeUserHandler}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-2 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Select Active User
              </button>
            </div>
          </div>
        </form>
      </main>
      {openModal && <Modal setOpenModal={setOpenModal} setUsers={setUsers} />}
    </>
  );
}
