import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavbarAndFooter/NavBar";
import Footer from "../common/NavbarAndFooter/WebFooter";
import MobileFooter from "../common/NavbarAndFooter/MobileFooter";
import { Helmet } from "react-helmet";
import classNames from "classnames";

const About = () => {
  return (
    <div style={{ position: "relative" }}>
      <Helmet title="About"></Helmet>
      <NavBar></NavBar>
      <div style={{ minHeight: "100vh" }}>
        <p>About us Page</p>
      </div>
      <Footer></Footer>
      <MobileFooter></MobileFooter>
    </div>
  );
};

export default About;
