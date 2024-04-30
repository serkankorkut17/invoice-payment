import "@/styles/globals.css";
import { UserProvider } from "@/context/User";
// import 'flowbite';

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
            <Component {...pageProps} />
      </UserProvider>
  );
}
