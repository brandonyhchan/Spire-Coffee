import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Footer from "component/common/NavbarAndFooter/WebFooter";
import MobileFooter from "component/common/NavbarAndFooter/MobileFooter";

import styles from "./favourites.module.scss";
import strings from "config/strings";

const Favorites = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.favourites.helmet} />
      <div className={classNames(styles.container)}>
        <NavBar />
        <div>
          <p>{strings.favourites.title}</p>
        </div>
        <Footer />
        <MobileFooter />
      </div>
    </React.Fragment>
  );
};

export default Favorites;
