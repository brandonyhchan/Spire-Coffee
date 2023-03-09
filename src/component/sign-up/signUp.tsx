import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./signUp.module.scss";

type SignUpFormData = {
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  verifyPassword: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  
  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Helmet title={strings.signUp.helmet} />
      <h1 className={classNames(styles.heading)}>{strings.signUp.title}</h1>
      <div className={classNames(styles.signUpContainer)}>
        <div className={classNames(styles.signUp)}>
          <form 
            className={classNames(styles.signUpForm)}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            >
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.usernameLabel}
                required
                {...register("username", { required: true })}
              />
              <label>{strings.signUp.usernameLabel}</label>
              {errors.username && <span className={classNames(styles.expanded)}>Username is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.firstNameLabel}
                required
                {...register("firstName", { required: true })}
              />
              <label>{strings.signUp.firstNameLabel}</label>
              {errors.firstName && <span>First name is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.lastNameLabel}
                required
                {...register("lastName", { required: true })}
              />
              <label>{strings.signUp.lastNameLabel}</label>
              {errors.lastName && <span >Last name is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.emailLabel}
                required
                {...register("emailAddress", { required: true })}
              />
              <label>{strings.signUp.emailLabel}</label>
              {errors.emailAddress && <span>Email address is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.passwordLabel}
                required
                {...register("password", { required: true })}
              />
              <label>{strings.signUp.passwordLabel}</label>
              {errors.password && <span>Password is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.signUp.verifyPasswordLabel}
                required
                {...register("verifyPassword", { required: true })}
              />
              <label>{strings.signUp.verifyPasswordLabel}</label>
              {errors.verifyPassword && (
                <span>Please re-enter your password.</span>
              )}
            </div>
            <Button
            buttonType="submit"
            className="signUpButton"
            text={strings.signUp.buttonText}
          />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
