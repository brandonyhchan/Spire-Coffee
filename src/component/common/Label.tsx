import React from "react";
import { renderCafeIcon } from "component/common/Icons/Icons";
import styles from "../pages/cafe/cafe.module.scss";
import classNames from "classnames";

type LabelPropsType = {
  icon?: string | JSX.Element;
  otherIcon?: string;
  text: string | undefined;
  secondaryText?: string;
  anchorTag?: boolean;
  link?: string;
};

const Label = ({
  icon,
  otherIcon,
  text,
  secondaryText,
  anchorTag,
  link,
}: LabelPropsType) => {
  return (
    <div className={classNames(styles.labelContainer)}>
      {typeof icon === "string" ? renderCafeIcon(icon) : icon}
      {!anchorTag ? (
        <label>{text !== null ? text : secondaryText}</label>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={classNames(styles.websiteLink)}
        >
          {text}
          {renderCafeIcon(otherIcon)}
        </a>
      )}
    </div>
  );
};

export default Label;
