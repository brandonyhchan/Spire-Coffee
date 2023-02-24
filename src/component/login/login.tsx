import React /* MouseEventHandler */ from "react";
import { Link /* useNavigate */ } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../../global.scss";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./login.module.scss";

const Login = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <h1>{strings.login.title}</h1>
      <div className={classNames(styles.loginContainer)}>
        <div className={classNames(styles.login)}>
          <form className={classNames(styles.loginForm)}>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
          </form>
          <Button
            text={strings.login.title}
            type="primary"
            className={styles.primary}
          />
          <p>
            {strings.login.text}
            <Link to="/signUp">{strings.login.link}</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
