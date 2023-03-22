import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavbarAndFooter/NavBar";
import WebFooter from "../common/NavbarAndFooter/WebFooter";
import MobileFooter from "../common/NavbarAndFooter/MobileFooter";
import { Helmet } from "react-helmet";

const Faq = () => {
  return (
    <div style={{ position: "relative" }}>
      <Helmet title="Faq"></Helmet>
      <NavBar></NavBar>
      <div style={{ minHeight: "100vh" }}>
        <p>Faq Page</p>
      </div>
      <WebFooter></WebFooter>
      <MobileFooter></MobileFooter>
    </div>
  );
};

export default Faq;
