import React, { useState } from "react";
import { Cafe } from "types/api/cafe";
import { useParams } from "react-router-dom";
import { cafeMutation } from "support/graphqlServerApi";
import { useMutation } from "@apollo/client";
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
import moment from "moment";
import Button from "component/common/Button";
import classNames from "classnames";
import styles from "./report.module.scss";
import strings from "config/strings";

type ReportPropsType = {
  cafe: Cafe | undefined;
};

const Report = ({ cafe }: ReportPropsType) => {
  let dateToSendToDb;
  const { cafeId } = useParams();

  const [showUserReport, setShowUserReport] = useState(false);
  const [busyness, setBusyness] = useState<SelectOptions>(SelectOptions.LOW);
  const [noisiness, setNoisiness] = useState<SelectOptions>(SelectOptions.LOW);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [disableReportButton, setDisableReportButton] = useState(false);
  const [userReportTime, setUserReportTime] = useState("");

  const [updateCafe] = useMutation(cafeMutation, {
    onError: (error) => {
      alert(error);
      console.log("Error updating cafe info."); // change this to require config/strings.ts later
    },
  });

  function openUserReport(): void {
    setShowUserReport(true);
  }

  function submitUserReport(): void {
    setShowUserReport(false);
    setShowSubmitMessage(true);
    setDisableReportButton(true);

    dateToSendToDb = moment().format();
    setUserReportTime(dateToSendToDb);
    console.log(dateToSendToDb);

    updateCafe({
      variables: {
        stringId: cafeId,
        busyFilter: busyness,
        noiseFilter: noisiness,
      },
    });
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
              type="mobileSizePrimaryOpposite"
              buttonType="reset"
              text={strings.cafe.cancelReportButton}
              onClick={cancelUserReport}
            />
            <Button
              type="mobileSizePrimary"
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
