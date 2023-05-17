import React, { useState } from "react";
import classNames from "classnames";
import styles from "./report.module.scss";
import strings from "config/strings";
import Button from "component/common/Button";
import { Cafe } from "types/api/cafe";
import StatusSlider from "component/common/StatusSlider/StatusSlider";
import { renderBusyIcon, renderNoiseIcon } from "component/common/Icons/Icons";
import {
  busynessSliderValue,
  noisinessSliderValue,
  maxValue,
  minValue,
  step,
} from "./UserReport";
import { SelectOptions } from "component/common/Filter/FilterType/RadioFilter";

type ReportPropsType = {
  cafe: Cafe | undefined;
};

const Report = ({ cafe }: ReportPropsType) => {
  const [showUserReport, setShowUserReport] = useState(false);
  const [busyness, setBusyness] = useState<SelectOptions>();
  const [noisiness, setNoisiness] = useState<SelectOptions>();
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [disableReportButton, setDisableReportButton] = useState(false);

  function openUserReport(): void {
    setShowUserReport(true);
    console.log("Show the User Report");
  }

  function submitUserReport(): void {
    setShowUserReport(false);
    setShowSubmitMessage(true);
    setDisableReportButton(true);
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
              filterSelection={busyness}
              handleFilter={setBusyness}
              icon={renderBusyIcon(cafe?.busyness)}
              optionValues={busynessSliderValue}
              maxValue={maxValue}
              minValue={minValue}
              step={step}
              statusTitle={strings.cafe.reportBusynessTitle}
            />
            <StatusSlider
              filterSelection={noisiness}
              handleFilter={setNoisiness}
              icon={renderNoiseIcon(cafe?.noisiness)}
              optionValues={noisinessSliderValue}
              maxValue={maxValue}
              minValue={minValue}
              step={step}
              statusTitle={strings.cafe.reportNoisinessTitle}
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
              onClick={submitUserReport}
            />
          </div>
        </div>
      )}
      {!showUserReport && (
        <div
        // className={
        //   disableReportButton ? classNames(styles.hideReportButton) : ""
        // }
        >
          <Button
            buttonType="submit"
            text={strings.cafe.reportButton}
            onClick={openUserReport}
            disabled={disableReportButton}
          />
        </div>
      )}
      {showSubmitMessage && (
        <div className={classNames(styles.reportSubmitMessage)}>
          <p>{strings.cafe.reportSubmitMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Report;
