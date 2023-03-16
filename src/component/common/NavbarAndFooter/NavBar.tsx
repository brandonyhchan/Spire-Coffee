import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import classNames from "classnames";
import "../../../global.scss";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

// const active: React.CSSProperties = {
//   borderBottom: "3px solid var(--secondary)",
//   paddingBottom: "6px",
// };

function ul(index: number) {
  console.log('click!' + index)
	
	var underlines = document.querySelectorAll(".underline");

	for (var i = 0; i < underlines.length; i++) {
		underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
	}
}

export const navbar = () => {

  return (
    <div className={classNames(styles.navbar)}>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classNames(styles.toolBar)}>
          <div className={classNames(styles.logo)}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <CoffeeIcon />
            </IconButton>
            <Typography
              className={classNames(styles.name)}
              variant="h6"
              component="div"
              sx={{ marginLeft: "10px" }}
            >
              SpireCoffee
            </Typography>
          </div>

          <div className={classNames(styles.navLinks)}>
            <Stack direction="row" spacing={1} className={classNames(styles.link, styles.underline)}>
              <p className={classNames(styles.link)}>
                <NavLink
                  //style={({ isActive }) => isActive ? active : {} }
                  to="/addCafe"
                  color="inherit"
                  onClick={ul(0)}
                >
                  Add a Cafe
                </NavLink>
              </p>
              <p className={classNames(styles.link)}>
                <NavLink
                  //style={({ isActive }) => isActive ? active : {} }
                  to="/explore"
                  color="inherit"
                  onClick={ul(1)}
                >
                  Explore
                </NavLink>
              </p>
              <p className={classNames(styles.link)}>
                <NavLink
                  //style={({ isActive }) => isActive ? active : {} }
                  to="/account"
                  color="inherit"
                  onClick={ul(2)}
                >
                  Account
                </NavLink>
              </p>
              <p className={classNames(styles.link)}>
                <NavLink
                  to="/"
                  onClick={ul(3)}
                >
                  Sign out
                </NavLink>
              </p>
            </Stack>
          </div>
        </Toolbar>
      </AppBar>

      {/* This is ugly but its so that there will be space between navbar and content, can take out in future
 when we see what our page content will look like */}
      <div className={classNames(styles.padding)}></div>
    </div>
  );
};

export default navbar;
