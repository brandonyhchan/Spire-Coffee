import React from "react";
import Button from "component/common/Button";
import MapPlaceholder from "assets/images/map_placeholder.jpg";
import classNames from "classnames";
import styles from "./map.module.scss";
import strings from "config/strings";

const Map = () => {
  return (
    <div className={classNames(styles.mapContainer)}>
      <div className={classNames(styles.mapWrapper)}>
        <img src={MapPlaceholder} alt={MapPlaceholder} />
      </div>
      <Button text={strings.cafe.getDirections} buttonType="submit" />
    </div>
  );
};

export default Map;
