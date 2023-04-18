import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/ExploreOffOutlined";
import AccountIcon from "@mui/icons-material/PersonOutlined";
import { useState } from "react";
import styles from "./MobileFooter.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

export const MobileFooter = () => {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);
  const xsMobileSize = useMediaQuery("(max-width:300px)");

  //can probably get rid of below because they are the same thing! was just
  //testing out some stuff

  const sMobileStyle = {
    position: "fixed",
    bottom: "-3px",
    width: "100%",
    zIndex: 100,
  };

  const xsMobileStyle = {
    position: "fixed",
    bottom: "-3px",
    width: "100%",
    zIndex: 100,
  };

  return (
    <div className={classNames(styles.mobileFooter)}>
      <BottomNavigation
        value={value}
        onChange={(event: any, newValue: React.SetStateAction<string>) => {
          setValue(newValue);
        }}
        sx={xsMobileSize ? xsMobileStyle : sMobileStyle}
      >
        <BottomNavigationAction
          component={Link}
          to="/favourites"
          value={"/favourites"}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/addCafe"
          value={"/addCafe"}
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/explore"
          value={"/explore"}
          icon={<ExploreIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/account"
          value={"/account"}
          icon={<AccountIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default MobileFooter;
