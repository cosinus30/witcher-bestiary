import "../styles/globals.css";
import type { AppProps } from "next/app";
import FilterProvider from "../context/FilterProvider";
import DropdownProvider from "../context/DropdownProvider";
import Navbar from "../components/Navigation/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <FilterProvider>
        <DropdownProvider>
          <Component {...pageProps} />
        </DropdownProvider>
      </FilterProvider>
    </div>
  );
}

export default MyApp;
