import React from "react";
import MapPlaceholder from "assets/images/map_placeholder.jpg";
import classNames from "classnames";
import styles from "./map.module.scss";

const Map = () => {
  return (
    <div className={classNames(styles.mapContainer)}>
      <img src={MapPlaceholder} alt={MapPlaceholder} />
    </div>
  );
};

export default Map;
