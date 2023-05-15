import React, { useState } from "react";
import classNames from "classnames";
import styles from "./report.module.scss";
import strings from "config/strings";
import Button from "component/common/Button";
import { Cafe } from "types/api/cafe";
import StatusSlider from "./userReportSliders/StatusSlider";
import { renderBusyIcon, renderNoiseIcon } from "component/common/Icons/Icons";
import { busynessSliderValue, noisinessSliderValue } from "./userReport";

type ReportPropsType = {
  cafe: Cafe;
};

const Report = ({ cafe }: ReportPropsType) => {
  const [showUserReport, setShowUserReport] = useState(false);
  const [busyness, setBusyness] = useState(0);

  function openUserReport(): void {
    setShowUserReport(true);
    console.log("Show the User Report");
  }

  function submitUserReport(): void {
    setShowUserReport(false);
  }

  function cancelUserReport(): void {
    setShowUserReport(false);
  }

  return (
    <div className={classNames(styles.reportWrapper)}>
      <span>{strings.cafe.reportText}</span>
      {showUserReport && (
        <div className={classNames(styles.reportWrapper)}>
          <div className={classNames(styles.userReportContainer)}>
            <StatusSlider
              cafe={cafe}
              filterSelection={busyness}
              handleFilter={setBusyness}
              icon={renderBusyIcon()}
              optionValues={busynessSliderValue}
            />
          </div>
          <div className={classNames(styles.showUserReportButtons)}>
            <Button
              type="primaryOpposite"
              buttonType="reset"
              text={strings.cafe.cancelReportButton}
              onClick={cancelUserReport}
            />
            <Button
              buttonType="submit"
              text={strings.cafe.submitReportButton}
              onClick={cancelUserReport}
            />
            <Button
              buttonType="submit"
              text={strings.cafe.submitReportButton}
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
