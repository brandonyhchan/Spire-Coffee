import classNames from "classnames";
import { Link } from "react-router-dom";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder"
import AddIcon from "@mui/icons-material/Add"
import ExploreIcon from "@mui/icons-material/ExploreOffOutlined"
import AccountIcon from "@mui/icons-material/PersonOutlined"
import { useState } from "react";
import styles from "./MobileFooter.module.scss";

export const MobileFooter = () => {
  const pathname = window.location.pathname
  const [value, setValue] = useState(pathname)


  return (
    <div className={classNames(styles.mobileFooter)}>
      <BottomNavigation value={value} onChange = {(event, newValue) => {setValue(newValue)}}>
        <BottomNavigationAction component={Link} to="/home" value={"/home"} icon={<FavoriteIcon />}></BottomNavigationAction>
        <BottomNavigationAction component={Link} to="/addCafe" value={"/addCafe"} icon={<AddIcon />}></BottomNavigationAction>
        <BottomNavigationAction component={Link} to="/explore" value={"/explore"} icon={<ExploreIcon />}></BottomNavigationAction>
        <BottomNavigationAction component={Link} to="/account" value={"/account"} icon={<AccountIcon />}></BottomNavigationAction>
      </BottomNavigation>
    </div>
  )
}

export default MobileFooter;
