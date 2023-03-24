import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import NavBar from "../../common/NavbarAndFooter/NavBar";
import Footer from "../../common/NavbarAndFooter/WebFooter";
import MobileFooter from "../../common/NavbarAndFooter/MobileFooter";

import styles from "./faq.module.scss";

const Faq = () => {
  return (
    <React.Fragment>
      <Helmet title="Explore" />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div>
          <p>FAQ</p>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Faq;
