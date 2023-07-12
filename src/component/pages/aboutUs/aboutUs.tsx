import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";

import styles from "./aboutUs.module.scss";
import strings from "config/strings";

const aboutUs = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.aboutUs.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.aboutUs)}>
          <p>{strings.aboutUs.title}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default aboutUs;
