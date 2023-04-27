import React, { ReactElement, useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import classNames from "classnames";
import styles from "./FilterComponent.module.scss";

type FilterComponentPropsType = {
  text: string;
  children?: ReactElement | ReactElement[];
  mobileFiltersOpen: boolean;
};

const FilterComponent = ({
  text,
  children,
  mobileFiltersOpen,
}: FilterComponentPropsType) => {
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
        {!showExpandedSection ? (
          <ExpandMoreRoundedIcon
            className={classNames(styles.expandMoreIcon)}
            sx={{
              display: mobileFiltersOpen ? "none" : "inline-block",
            }}
          ></ExpandMoreRoundedIcon>
        ) : (
          <ExpandLessRoundedIcon
            className={classNames(styles.expandLessIcon)}
            sx={{
              display: mobileFiltersOpen ? "none" : "inline-block",
            }}
          ></ExpandLessRoundedIcon>
        )}
      </div>
      {showExpandedSection || mobileFiltersOpen ? children : null}
    </div>
  );
};

export default FilterComponent;
