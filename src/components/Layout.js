import { useEffect } from "react";
import Navigation from "./Navigation";
import Head from "next/head";

const Layout = (props) => {
  // useEffect(() => {
  //   document.querySelector("html").classList.add("dark");
  // });

  return (
    <div className="m-0">
      <Head>
        <title>Invoice Payment</title>
      </Head>
      <Navigation title={props.title} />
    </div>
  );
};

export default Layout;
