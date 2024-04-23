import "@/styles/globals.css";
import { UserProvider } from "@/context/User";

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
            <Component {...pageProps} />
      </UserProvider>
  );
}
