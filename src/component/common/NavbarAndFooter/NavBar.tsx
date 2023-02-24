import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import "./NavBar.scss";

type NavBarPropsType = {
  className?: string;
};

const navbar = ({ className }: NavBarPropsType) => (
  <div className="navbar">NavBar</div>
);

export default navbar;
