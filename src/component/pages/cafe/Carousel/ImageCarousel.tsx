import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Image";
import Placeholder from "assets/images/placeholder.jpg";
import Placeholder2 from "assets/images/placeholder2.jpg";
import styles from "./ImageCarousel.module.scss";
import classNames from "classnames";

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
    <div className={classNames(styles.carouselContainer)}>
      <Carousel
        autoPlay={false}
        animation={"slide"}
        duration={800}
        className={classNames(styles.carousel)}
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: "white",
            color: "#4e576e",
            borderRadius: 0,
            margin: 0,
            width: "60px",
          },
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
