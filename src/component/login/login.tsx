import React /* MouseEventHandler */ from "react";
import { Link /* useNavigate */ } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./login.module.scss";
import "../../global.scss";

const Login = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <h1>{strings.login.title}</h1>
      <p>{strings.login.description}</p>
      <div className={classNames(styles.loginContainer)}>
        <div className={classNames(styles.login)}>
          <form className={classNames(styles.loginForm)}>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.login.usernameLabel}
                required
              />
              <label>{strings.login.usernameLabel}</label>
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.login.passwordLabel}
                required
              />
              <label>{strings.login.passwordLabel}</label>
            </div>
            <Button
              type="secondary"
              className={styles.secondary}
              text={strings.login.title}
            />
            <p>
              {strings.login.text}
              <Link to="/signUp">{strings.login.link}</Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
