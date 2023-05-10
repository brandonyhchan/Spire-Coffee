import React, { useState } from "react";
import classNames from "classnames";
import styles from "./userReport.module.scss";
import strings from "config/strings";
import Button from "component/common/Button";
import BusynessSlider from "./userReportSliders/BusynessSlider";

const UserReport = () => {
  const [busyness, setBusyness] = useState(0);

  return (
    <div className={classNames(styles.userReportContainer)}>
      <BusynessSlider filterSelection={busyness} handleFilter={setBusyness} />
    </div>
  );
};

export default UserReport;
