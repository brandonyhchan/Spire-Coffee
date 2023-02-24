import React from "react";
import { Helmet } from "react-helmet-async";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./signUp.module.scss";

const SignUp = () => {
  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <h1>{strings.signUp.title}</h1>
      <div className={classNames(styles.signUpContainer)}>
        <div className={classNames(styles.signUp)}>
          <form className={classNames(styles.signUpForm)}>
            {/* <label>
              {strings.signUp.firstNameLabel}
              <input type="text" name="firstName" />
            </label>
            <label>
              {strings.signUp.lastNameLabel}
              <input type="text" name="lastName" />
            </label>
            <label>
              {strings.signUp.emailLabel}
              <input type="text" name="emailAddress" />
            </label>
            <label>
              {strings.signUp.passwordLabel}
              <input type="text" name="password" />
            </label>
            <label>
              {strings.signUp.verifyPasswordLabel}
              <input type="text" name="verifyPassword" />
            </label> */}
            <input type="text" name="firstName" placeholder="First Name" />
            <input type="text" name="lastName" placeholder="Last Name" />
            <input
              type="text"
              name="emailAddress"
              placeholder="Email Address"
            />
            <input type="text" name="password" placeholder="Password" />
            <input
              type="text"
              name="verifyPassword"
              placeholder="Confirm Password"
            />
          </form>
          <Button
            className="signUpButton"
            buttonType="submit"
            text={strings.signUp.buttonText}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
