import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { UserProvider } from "@/context/User";

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </UserProvider>
  );
}
