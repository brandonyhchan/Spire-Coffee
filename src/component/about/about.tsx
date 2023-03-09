import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavbarAndFooter/NavBar";
import Footer from "../common/NavbarAndFooter/WebFooter";
import MobileFooter from "../common/NavbarAndFooter/MobileFooter";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div style={{ position: "relative" }}>
      <Helmet title="About"></Helmet>
      <NavBar></NavBar>
      <div style={{ height: "1000px" }}>
        <p>About us Page</p>
      </div>
      <Footer></Footer>
      <MobileFooter></MobileFooter>
    </div>
  );
};

export default About;
