import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import NavBar from "../../common/NavbarAndFooter/NavBar";
import Footer from "../../common/NavbarAndFooter/WebFooter";
import MobileFooter from "../../common/NavbarAndFooter/MobileFooter";

import styles from "./addCafe.module.scss";

const AddCafe = () => {
  return (
    <React.Fragment>
      <Helmet title="AddCafe" />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div>
          <p>Add Cafe Page</p>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default AddCafe;
