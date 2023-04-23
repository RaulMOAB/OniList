import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from '@/components/Footer/Footer'
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function Layout({ children }) {
  const {theme} = useContext(ThemeContext)
  return (
    <>

    <div data-theme={theme} className={theme === 'oni-ligth'? 'body-ligth':'body-dark'+'  font-sans'}>
      <Navbar />
        <main>{children}</main>
      <Footer/>
    </div>
    </>
  );
}
