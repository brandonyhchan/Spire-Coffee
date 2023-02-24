import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavbarAndFooter/NavBar";
import Footer from "../common/NavbarAndFooter/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <Helmet title="Home"></Helmet>
      <NavBar></NavBar>
      <div style={{ height: "1000px" }}>
        <p>Welcome User</p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
