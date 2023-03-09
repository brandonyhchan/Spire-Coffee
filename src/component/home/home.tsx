import React from "react";
import NavBar from "../common/NavbarAndFooter/NavBar";
import WebFooter from "../common/NavbarAndFooter/WebFooter";
import MobileFooter from "../common/NavbarAndFooter/MobileFooter";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <Helmet title="Home"></Helmet>
      <NavBar></NavBar>
      <div style={{ height: "1000px" }}>
        <p>Welcome User</p>
      </div>
      <WebFooter></WebFooter>
      <MobileFooter></MobileFooter>
    </div>
  );
};

export default Home;
