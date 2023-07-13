import React from "react";
import classNames from "classnames";
import MobileFooter from "./common/NavbarAndFooter/MobileFooter";
import Footer from "./common/NavbarAndFooter/WebFooter";

import styles from "./Body.module.scss";

type BodyPropsType = {
  children: JSX.Element | null;
};

const Body = ({ children = null }: BodyPropsType) => (
  <div className={classNames(styles.containerWrap)}>
    <main className={classNames(styles.body, "d-flex", "flex-column")}>
      <div className={classNames(styles.contentWrapper)}>{children}</div>
    </main>
    <div className={classNames(styles.footer)}>
      <Footer />
      <MobileFooter />
    </div>
  </div>
);

export default Body;
