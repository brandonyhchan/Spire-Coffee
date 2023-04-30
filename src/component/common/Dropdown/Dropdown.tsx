import React, { ReactElement, useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import classNames from "classnames";
import styles from "./Dropdown.module.scss";

type DropdownPropsType = {
  text: string;
  children?: ReactElement | ReactElement[];
  className?: string;
};

const Dropdown = ({ text, children }: DropdownPropsType) => {
  const [showExpandedSection, setShowExpandedSection] = useState(false);
  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setShowExpandedSection(!showExpandedSection);
  };
  return (
    <div className={classNames(styles.expandableItems)}>
      <div className={classNames(styles.expandedItemGroup)}>
        <div className={classNames(styles.filterButton)}>{text}</div>
        {!showExpandedSection ? (
          <ExpandMoreRoundedIcon
            className={classNames(styles.expandMoreIcon)}
            onClick={handleClick}
          ></ExpandMoreRoundedIcon>
        ) : (
          <ExpandLessRoundedIcon
            className={classNames(styles.expandLessIcon)}
            onClick={handleClick}
          ></ExpandLessRoundedIcon>
        )}
      </div>
      {showExpandedSection ? children : null}
    </div>
  );
};

export default Dropdown;
