/* eslint-disable prettier/prettier */
import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import "./Footer.scss";

type FooterPropsType = {
  className?: string;
};

const footer = ({ className }: FooterPropsType) => (
  <div className="footer">footer</div>
);

export default footer;
