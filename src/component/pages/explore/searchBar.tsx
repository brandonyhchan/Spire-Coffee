import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import classNames from "classnames";
import styles from "./SearchBar.module.scss";
import { CafeData } from "./mockCafeData";
import Logo from "assets/images/placeholder-logo.jpg";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";

const SearchBar = () => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [query, setQuery] = useState("");
  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setQuery("");
    setShowCloseButton(false);
  };
  return (
    <React.Fragment>
      <form className={classNames(styles.searchBar)}>
        <SearchRoundedIcon
          className={classNames(styles.searchBarIcon)}
        ></SearchRoundedIcon>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          onFocus={() => setShowCloseButton(true)}
          value={query}
        />
        {!showCloseButton ? null : (
          <div className={classNames(styles.clearButtonContainer)}>
            <CloseRoundedIcon
              className={classNames(styles.clearButton)}
              onClick={handleClick}
            ></CloseRoundedIcon>
          </div>
        )}
      </form>
      <div className={classNames(styles.cafeCardContainer)}>
        {CafeData.filter((cafe) => {
          if (query === "") {
            return cafe;
          } else if (cafe.name.toLowerCase().includes(query.toLowerCase())) {
            return cafe;
          }
        }).map((cafe, index) => (
          <div key={index} className={classNames(styles.cafeCard)}>
            <div className={classNames(styles.logo)}>
              <img src={Logo} alt={Logo} />
            </div>
            <div className={classNames(styles.cafeCardInfo)}>
              <h5>{cafe.name}</h5>
              <p>
                {cafe.address}, {cafe.city}
              </p>
              <div className={classNames(styles.cafeCardIcons)}>
                <div className={classNames(styles.busyness)}>
                  <VolumeUpRoundedIcon
                    className={classNames(styles.busynessIcon)}
                  ></VolumeUpRoundedIcon>
                  <label>Busyness</label>
                </div>
                <div className={classNames(styles.noisiness)}>
                  <AccessAlarmRoundedIcon
                    className={classNames(styles.noisinessIcon)}
                  ></AccessAlarmRoundedIcon>
                  <label>Noisiness</label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
