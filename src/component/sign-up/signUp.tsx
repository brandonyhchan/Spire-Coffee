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
      <div
        className={classNames(
          styles.signUp,
          "py-3",
          "d-flex",
          "flex-column",
          "align-items-center"
        )}
      >
        <h1>{strings.signUp.title}</h1>
        <form>
          <div>
            <input type="text" name="firstName" placeholder="First Name" />
          </div>
          <div>
            <input type="text" name="lastName" placeholder="Last Name" />
          </div>
          <div>
            <input
              type="text"
              name="emailAddress"
              placeholder="Email Address"
            />
          </div>
          <div>
            <input type="text" name="password" placeholder="Password" />
          </div>
          <div>
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
