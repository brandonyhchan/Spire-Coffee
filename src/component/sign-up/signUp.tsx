import React from "react";
import Button from "../common/Button";
import strings from "../../config/strings";
import { Helmet } from "react-helmet-async";
import classNames from "classnames";
import styles from "./signUp.module.scss";

const SignUp = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <h1>{strings.signUp.title}</h1>
      <div className={classNames(styles.signUpForm)}>
        <form>
          <div className={classNames(styles.firstname)}>
            <input type="text" name="firstName" placeholder="First Name" />
          </div>
          <div className={classNames(styles.lastname)}>
            <input type="text" name="lastName" placeholder="Last Name" />
          </div>
          <div className={classNames(styles.email)}>
            <input
              type="text"
              name="emailAddress"
              placeholder="Email Address"
            />
          </div>
          <div className={classNames(styles.password)}>
            <input type="text" name="password" placeholder="Password" />
          </div>
          <div className={classNames(styles.verifyPassword)}>
            <input
              type="text"
              name="verifyPassword"
              placeholder="Confirm Password"
            />
          </div>
          <Button buttonType="submit" text="Sign Up" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
