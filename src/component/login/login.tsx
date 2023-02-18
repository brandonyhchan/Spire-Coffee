import React /* MouseEventHandler */ from "react";
import { Link /* useNavigate */ } from "react-router-dom";
import Button from "../common/Button";
import strings from "../../config/strings";
import { Helmet } from "react-helmet-async";
import styles from "./login.module.scss";
import classNames from "classnames";

const Login = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <div>
        <h1>{strings.login.title}</h1>
        <div className={classNames(styles.loginForm)}>
          <form>
            <div className={classNames(styles.username)}>
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div className={classNames(styles.password)}>
              <input type="text" name="password" placeholder="Password" />
            </div>
          </form>
          <Button text="Login" />
          <p>
            {strings.login.text}
            <Link to={strings.login.path}>{strings.login.link}</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
