import React from "react";
import classNames from "classnames";

import styles from "./Body.module.scss";

type BodyPropsType = {
  children: JSX.Element | null;
};

const Body = ({ children = null }: BodyPropsType) => (
  <main
    className={classNames(
      styles.body,
      "d-flex",
      "flex-column",
      "align-items-center"
    )}
  >
    {children}
  </main>
);

export default Body;
