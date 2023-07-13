import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";

import styles from "./faq.module.scss";
import strings from "config/strings";

const Faq = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.faq.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.faq)}>
          <p>{strings.faq.title}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
