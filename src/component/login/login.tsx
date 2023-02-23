import React /* MouseEventHandler */ from "react";
import { Link /* useNavigate */ } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./login.module.scss";

const Login = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <h1>{strings.login.title}</h1>
      <div className={classNames(styles.loginForm)}>
        <form>
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
        </form>
        <Button text="Login" />
        <p>
          {strings.login.text}
          <Link to="/signUp">{strings.login.link}</Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Login;
