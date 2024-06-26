import "@/styles/globals.css";
import '@/styles/menu.css'
import '@/styles/signup.css'
import { createContext, useEffect, useState } from "react";
import NavbarBefore from "@/components/navbar-before";
import CustomerNav from "./customer/customerNav";
import Footer from "./customer/Footer";
import AboutUs from "./customer/AboutUs";

import Restaurants from "./customer/Restaurants";
import ContactUs from "./customer/ContactUs";

// import ReactDOM from 'react-dom';
export const TokenContext = createContext();

export default function App({ Component, pageProps }) {

  const [haveToken, setHaveToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      check(token);
    }
  }, []);

  async function check(token) {
    const isTokenValidResponse = await fetch(
      "https://capstone-backend-production-8314.up.railway.app/customer/checktoken",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    if (isTokenValidResponse.status !== 200) {
      localStorage.removeItem("token");
      setHaveToken(false);
    } else {
      setHaveToken(true);
    }
  }
  return (
    <>
      <TokenContext.Provider value={{ haveToken, setHaveToken }}>
        <Component {...pageProps} />
      </TokenContext.Provider>
      <Footer />
    </>
  );
}
