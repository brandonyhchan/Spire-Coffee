/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./mobileFilterComponent.module.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type closeFilterPropsType = {
  showMobileFilters: any;
};

const MobileFilterComponent = ({ showMobileFilters }: closeFilterPropsType) => {
  const handleClick = () => {
    showMobileFilters();
  };

  return (
    <div className={classNames(styles.mobileFilterContainer)}>
      <CloseRoundedIcon
        className={classNames(styles.closeFiltersButton)}
        onClick={handleClick}
      />
      <p>Insert Filters Here :)</p>
    </div>
  );
};

export default MobileFilterComponent;
