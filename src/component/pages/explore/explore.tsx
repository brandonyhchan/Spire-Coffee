import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";
import classNames from "classnames";
import styles from "./explore.module.scss";

const Explore = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <React.Fragment>
      <Helmet title="Explore" />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div>
          <p>Explore Page</p>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Explore;
