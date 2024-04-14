import React from 'react'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div>
      <Head>
        <title>Invoice Payment</title>
      </Head>
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout