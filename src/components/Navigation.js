import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserContext } from '@/context/User';
import 'flowbite';

const Navigation = (props) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (user === null) return;
    setIsUser(true);
  }, [user]);

  const isActive = (href) => {
    return router.pathname === href ? true : false;
  }
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4 border-b-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/marmara.png"
            className="h-8"
            alt="Marmara Logo"
          />
          <span className="self-center text-base sm:text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
            {props.title}
          </span>
        </Link>
        <button
          // data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => { document.getElementById("navbar-default").classList.toggle("hidden"); }}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive("/") ? " text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "text-gray-900 dark:text-white"}`}
                aria-current="page"
              >
                Admin
              </Link>
            </li>
            <li>
              <a
                href="/invoice-manager"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive("/invoice-manager") ? " text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "text-gray-900 dark:text-white"} ${isUser ? "" : "pointer-events-none"}`}
              >
                Invoice Manager
              </a>
            </li>
            <li>
              <Link
                href="/payment-history"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive("/payment-history") ? " text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "text-gray-900 dark:text-white"} ${isUser ? "" : "pointer-events-none"}`}
              >
                Payment History
              </Link>
            </li>
            <li>
              <Link
                href="/auto-bill-payments"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive("/auto-bill-payments") ? " text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500" : "text-gray-900 dark:text-white"} ${isUser ? "" : "pointer-events-none"}`}
              >
                Auto Bill Payments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
