'use client'
import "./globals.css";
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import { useState } from "react";
import { ErrorContext } from "./contexts/ErrorContext";
import Footer from "./components/Footer";


export default function RootLayout({ children }) {
  const [error,setError]=useState({
    isError:false,
    message:''
  })
  return (
    <html lang="en">
      <body>
        <ErrorContext.Provider value={setError}>
          {(error.isError)?<Error message={error.message}/>:<></>}
          <NavBar/>
          {children}
          <Footer/>
        </ErrorContext.Provider>
      </body>
    </html>
  );
}
