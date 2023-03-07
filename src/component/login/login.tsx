import React /* MouseEventHandler */ from "react";
import { Link /* useNavigate */ } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import strings from "../../config/strings";
import classNames from "classnames";
import styles from "./login.module.scss";
import "../../global.scss";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <h1>{strings.login.title}</h1>
      <p>{strings.login.description}</p>
      <div className={classNames(styles.loginContainer)}>
        <div className={classNames(styles.login)}>
          <form
            className={classNames(styles.loginForm)}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.login.usernameLabel}
                required
                {...register("username", { required: true })}
              />
              <label>{strings.login.usernameLabel}</label>
              {errors.username && <span>Username is required.</span>}
            </div>
            <div className={classNames(styles.formItem)}>
              <input
                type="text"
                placeholder={strings.login.passwordLabel}
                required
                {...register("password", { required: true })}
              />
              <label>{strings.login.passwordLabel}</label>
              {errors.password && <span>Password is required.</span>}
            </div>
            <Button
              type="secondary"
              buttonType="submit"
              className={styles.secondary}
              text={strings.login.title}
            />
            <p>
              {strings.login.text}
              <Link to="/signUp">{strings.login.link}</Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
