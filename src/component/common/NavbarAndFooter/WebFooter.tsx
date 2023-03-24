import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./WebFooter.module.scss";

const WebFooter = () => {
  return (
    <div className={classNames(styles.webFooter)}>
      <div className={classNames(styles.branding)}>
        <h2 className={classNames(styles.branding__logo)}>SpireCoffee</h2>
        <p className={classNames(styles.branding__copyright)}>
          Copyright © 2023 SpireTech, Inc
        </p>
      </div>

      <div className={classNames(styles.secondRow)}>
        <div className={classNames(styles.aboutUs)}>
          <h5 className={classNames(styles.aboutUs__about)}>About</h5>
          <p className={classNames(styles.aboutUs__whoAreWe)}>
            <Link to="/aboutUs">Who are we</Link>
          </p>
          <p className={classNames(styles.aboutUs__faq)}>
            <Link to="/faq">FAQ</Link>
          </p>
        </div>

        <div className={classNames(styles.supportUs)}>
          <h5 className={classNames(styles.supportUs__likeUs)}>Like us?</h5>
          <p className={classNames(styles.supportUs__helpUs)}>
            <Link to="/helpUs">Help us out</Link>
          </p>
        </div>

        <div className={classNames(styles.socials)}>
          <h5 className={classNames(styles.socials__letsConnect)}>
            Lets Connect
          </h5>
          <p className={classNames(styles.socials__email)}>
            spiretechconsulting@gmail.com
          </p>

          <div className={classNames(styles.socials__socialsIcons)}>
            <h4 className={classNames(styles.socials__socialsIcons_facebook)}>
              <i className="bi bi-facebook"></i>
            </h4>
            <h4 className={classNames(styles.socials__socialsIcons_twitter)}>
              <i className="bi bi-twitter"></i>
            </h4>
            <h4 className={classNames(styles.socials__socialsIcons_instagram)}>
              <i className="bi bi-instagram"></i>
            </h4>
          </div>
        </div>
      </div>

      <p className={classNames(styles.copyright)}>
        Copyright © 2023 SpireTech, Inc
      </p>
    </div>
  );
};

export default WebFooter;
