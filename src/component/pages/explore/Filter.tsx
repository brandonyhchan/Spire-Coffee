import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Filter.module.scss";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

type FilterPropsType = {
  text: string;
};

const Filter = ({ text }: FilterPropsType) => {
  const [showExpandedSection, setShowExpandedSection] = useState(false);
  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setShowExpandedSection(!showExpandedSection);
  };
  return (
    <div className={classNames(styles.expandableItems)}>
      <div
        className={classNames(styles.expandedItemGroup)}
        onClick={handleClick}
      >
        <div className={classNames(styles.filterButton)}>{text}</div>
        <ExpandMoreRoundedIcon
          className={classNames(styles.dropDownIcon)}
          onClick={handleClick}
        ></ExpandMoreRoundedIcon>
      </div>
      {showExpandedSection ? <div>hello</div> : null}
    </div>
  );
};

export default Filter;
