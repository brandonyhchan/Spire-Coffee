import React from "react";
import Button from "../common/Button";
import strings from "../../config/strings";

const SignUp = () => {
  return (
    <React.Fragment>
      <div>
        <h1>{strings.signUp.title}</h1>
        <form>
          <div>
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
          </div>
          <Button buttonType="submit" text="Sign Up" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
