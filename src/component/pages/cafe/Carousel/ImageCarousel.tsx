import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Image";
import Placeholder from "assets/images/placeholder.jpg";
import Placeholder2 from "assets/images/placeholder2.jpg";
import styles from "./ImageCarousel.module.scss";
import classNames from "classnames";
import { useMediaQuery } from "@mui/material";

const ImageCarousel = () => {
  const items = [
    {
      imagePath: Placeholder,
    },
    {
      imagePath: Placeholder2,
    },
  ];
  return (
    <Carousel
      autoPlay={false}
      animation={"slide"}
      duration={800}
      navButtonsAlwaysVisible
      className={classNames(styles.carouselContainer)}
      navButtonsProps={{
        style: {
          backgroundColor: "#f5f5f700",
          color: "white",
          borderRadius: 0,
          width: "5px",
          marginTop: "-100%",
        },
      }}
    >
      {items.map((item, index) => (
        <div key={index} className={classNames(styles.carouselWrapper)}>
          <img src={item.imagePath} alt={item.imagePath} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
