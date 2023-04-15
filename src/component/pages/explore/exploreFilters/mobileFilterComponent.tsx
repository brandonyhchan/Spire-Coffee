/* eslint-disable prettier/prettier */
import React, { ChangeEvent, useState } from "react";
import strings from "config/strings";
import classNames from "classnames";
import styles from "./mobileFilterComponent.module.scss";;

function MobileFilterComponent() {
  return (
    <div className={classNames(styles.mobileFilterContainer)}>
        <p>Insert Filters Here :)</p>
    </div>
  );
}

export default MobileFilterComponent;