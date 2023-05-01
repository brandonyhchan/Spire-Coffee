import React from "react";
import classNames from "classnames";
import styles from "./report.module.scss";
import strings from "config/strings";
import Button from "component/common/Button";

const Report = () => {
  return (
    <div className={classNames(styles.reportContainer)}>
      <span>{strings.cafe.reportText}</span>
      <Button buttonType="submit" text={strings.cafe.reportButton} />
    </div>
  );
};

export default Report;
