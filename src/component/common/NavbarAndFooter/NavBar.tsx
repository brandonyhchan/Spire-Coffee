import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Stack } from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import classNames from "classnames";
import "global.scss";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import Button from "../Button";

const active: React.CSSProperties = {
  borderBottom: "3px solid var(--secondary)",
  paddingBottom: "6px",
};

export const navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={classNames(styles.navbar)}>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classNames(styles.toolBar)}>
          <div className={classNames(styles.logo)}>
            {/*Replacing this button once we get our logo! Only using it as a visual*/}
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
            <Stack
              direction="row"
              spacing={1}
              className={classNames(styles.link, styles.underline)}
            >
              <p className={classNames(styles.link)}>
                <NavLink
                  style={({ isActive }) => (isActive ? active : {})}
                  to="/addCafe"
                  color="inherit"
                >
                  Add a Cafe
                </NavLink>
              </p>
              <p className={classNames(styles.link)}>
                <NavLink
                  style={({ isActive }) => (isActive ? active : {})}
                  to="/explore"
                  color="inherit"
                >
                  Explore
                </NavLink>
              </p>
              <p className={classNames(styles.link)}>
                <NavLink
                  style={({ isActive }) => (isActive ? active : {})}
                  to="/favourites"
                  color="inherit"
                >
                  Favourites
                </NavLink>
              </p>
              <p className={classNames(styles.link)}>
                <NavLink
                  style={({ isActive }) => (isActive ? active : {})}
                  to="/account"
                  color="inherit"
                >
                  Account
                </NavLink>
              </p>
              <Button
                text={"Sign Out"}
                onClick={handleLogout}
                type={"navbar"}
              />
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
