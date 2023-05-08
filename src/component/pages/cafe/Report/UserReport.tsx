import React, { useState } from "react";
import classNames from "classnames";
import styles from "./userReport.module.scss";
import strings from "config/strings";
import Button from "component/common/Button";

const UserReport = () => {
  return (
    <div className={classNames(styles.userReportContainer)}>
      <p>I am the user report</p>
    </div>
  );
};

export default UserReport;
