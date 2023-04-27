import React from "react";
import { Paper } from "@mui/material";
import classNames from "classnames";
import styles from "./ImageCarousel.module.scss";

type ItemPropsType = {
  item: {
    imagePath: string;
  };
};

const Item = (props: ItemPropsType) => {
  return (
    <Paper>
      <img
        className={classNames(styles.imageContainer)}
        src={props.item.imagePath}
        alt={props.item.imagePath}
      />
    </Paper>
  );
};

export default Item;
