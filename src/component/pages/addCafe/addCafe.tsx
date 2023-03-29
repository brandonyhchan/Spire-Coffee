import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";

import styles from "./addCafe.module.scss";
import strings from "config/strings";

const AddCafe = () => {
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <React.Fragment>
      <Helmet title={strings.addCafe.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.addCafe)}>
          <p>{strings.addCafe.title}</p>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default AddCafe;
