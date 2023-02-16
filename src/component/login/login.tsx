import React, { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import strings from "../../config/strings";
import { Helmet } from "react-helmet-async";

const Login = () => {
  return (
    <React.Fragment>
      <Helmet title="Hello world" />
      <div>
        <h1>{strings.login.title}</h1>
        <Button text="click me" />
        <p>
          {strings.login.text}
          <Link to={strings.login.path}>{strings.login.link}</Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Login;
