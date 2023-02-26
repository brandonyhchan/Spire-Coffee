import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import "./Footer.scss";


type FooterPropsType = {
  className?: string;
};

const footer = ({ className }: FooterPropsType) => (
  <div className="footer">
    <p id="copyright">Copyright © 2023 SpireTech, Inc</p>
  </div>
);

export default footer;
