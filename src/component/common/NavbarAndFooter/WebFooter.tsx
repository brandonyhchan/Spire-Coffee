import React from "react";
import strings from "config/strings";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./WebFooter.module.scss";

const WebFooter = () => {
  return (
    <div className={classNames(styles.webFooter)}>
      <div className={classNames(styles.branding)}>
        <h2 className={classNames(styles.branding__logo)}>
          {strings.global.title}
        </h2>
        <p className={classNames(styles.branding__copyright)}>
          {strings.footer.copyright}
        </p>
      </div>

      <div className={classNames(styles.secondRow)}>
        <div className={classNames(styles.aboutUs)}>
          <h5 className={classNames(styles.aboutUs__about)}>
            {strings.footer.about}
          </h5>
          <p className={classNames(styles.aboutUs__whoAreWe)}>
            <Link to="/aboutUs">{strings.aboutUs.helmet}</Link>
          </p>
          <p className={classNames(styles.aboutUs__faq)}>
            <Link to="/faq">{strings.faq.helmet}</Link>
          </p>
        </div>

        <div className={classNames(styles.supportUs)}>
          <h5 className={classNames(styles.supportUs__likeUs)}>
            {strings.footer.like}
          </h5>
          <p className={classNames(styles.supportUs__helpUs)}>
            <Link to="/helpUs">{strings.footer.help}</Link>
          </p>
        </div>

        <div className={classNames(styles.socials)}>
          <h5 className={classNames(styles.socials__letsConnect)}>
            {strings.footer.connect}
          </h5>
          <p className={classNames(styles.socials__email)}>
            {strings.footer.email}
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

      <p className={classNames(styles.copyright)}>{strings.footer.copyright}</p>
    </div>
  );
};

export default WebFooter;
