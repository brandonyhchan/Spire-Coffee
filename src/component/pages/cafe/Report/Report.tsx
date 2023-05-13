import React, { useState } from "react";
import classNames from "classnames";
import styles from "./report.module.scss";
import strings from "config/strings";
import Button from "component/common/Button";

import UserReport from "./UserReport";

const Report = () => {
  const [showUserReport, setShowUserReport] = useState(false);

  function openUserReport(): void {
    setShowUserReport(true);
    console.log("Show the User Report");
  }

  function submitUserReport(): void {
    setShowUserReport(false);
  }

  function cancelReportButton(): void {
    setShowUserReport(false);
  }

  return (
    <div className={classNames(styles.reportWrapper)}>
      <span>{strings.cafe.reportText}</span>
      {showUserReport && (
        <div className={classNames(styles.reportWrapper)}>
          <UserReport />
          <div className={classNames(styles.showUserReportButtons)}>
            <Button
              buttonType="submit"
              text={strings.cafe.submitReportButton}
              onClick={submitUserReport}
            />
            <Button
              type="primaryOpposite"
              buttonType="reset"
              text={strings.cafe.cancelReportButton}
              onClick={submitUserReport}
            />
          </div>
        </div>
      )}
      {!showUserReport && (
        <Button
          buttonType="submit"
          text={strings.cafe.reportButton}
          onClick={openUserReport}
        />
      )}
    </div>
  );
};

export default Report;
