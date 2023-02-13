import React from "react";
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
      </div>
    </React.Fragment>
  );
};

export default Login;
