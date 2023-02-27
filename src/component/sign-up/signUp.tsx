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
            <input
              type="text"
              name="username"
              placeholder={strings.signUp.usernameLabel}
            />
            <input
              type="text"
              name="firstName"
              placeholder={strings.signUp.firstNameLabel}
            />
            <input
              type="text"
              name="lastName"
              placeholder={strings.signUp.lastNameLabel}
            />
            <input
              type="text"
              name="emailAddress"
              placeholder={strings.signUp.emailLabel}
            />
            <input
              type="text"
              name="password"
              placeholder={strings.signUp.passwordLabel}
            />
            <input
              type="text"
              name="verifyPassword"
              placeholder={strings.signUp.verifyPasswordLabel}
            />
          </form>
          <Button
            buttonType="submit"
            className="signUpButton"
            text={strings.signUp.buttonText}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
