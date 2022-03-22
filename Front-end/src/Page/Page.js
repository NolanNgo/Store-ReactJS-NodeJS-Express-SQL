// import React , {useState} from 'react';
import Navigation from "./Navigation/Navigation";
import Footer from "../Page/Footer/Footer";
import {Outlet } from "react-router-dom";
import Brands from "./Brand/Brand";
import {useEffect} from "react";
function Page() {
  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, []);
  return (
    <div className="main-page">
      <div className="container-navigation">
        <Navigation />
      </div>
      <Outlet/>
      <Brands/>
      <Footer/>
    </div>
  );
}

export default Page;
