import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";

import styles from "./helpUs.module.scss";

const HelpUs = () => {
  return (
    <React.Fragment>
      <Helmet title="Help us out" />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div className={classNames(styles.helpUs)}>
          <p>Help us out</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HelpUs;
