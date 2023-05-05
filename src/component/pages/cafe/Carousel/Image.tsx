import React from "react";
import classNames from "classnames";
import styles from "./ImageCarousel.module.scss";

type ItemPropsType = {
  className: string;
  item: {
    imagePath: string;
  };
};

const Image = (props: ItemPropsType) => {
  return (
    <img
      className={classNames(styles.imageContainer)}
      src={props.item.imagePath}
      alt={props.item.imagePath}
    />
  );
};

export default Image;
