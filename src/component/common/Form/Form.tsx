import React from "react";
import classNames from "classnames";
import styles from "./Form.module.scss";

type FormPropsType = {
  handleForm: (event: React.FormEvent<HTMLFormElement>) => void;
  handleKeyEvent?: (event: React.KeyboardEvent<HTMLFormElement>) => void;
  edit?: boolean;
  children: JSX.Element[];
  className?: string;
  buttonGroup?: JSX.Element;
  formType?: "login" | "signup" | "account";
};

const Form = ({
  handleForm,
  handleKeyEvent,
  edit,
  children,
  className,
  buttonGroup,
  formType = "login",
}: FormPropsType) => {
  return (
    <React.Fragment>
      <form
        noValidate
        onSubmit={handleForm}
        className={className}
        onKeyDown={handleKeyEvent}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={classNames(
              styles.formSectionContainer,
              styles[formType]
            )}
          >
            <div
              className={
                !edit
                  ? classNames(styles.inputWrapper)
                  : classNames(styles.editInputWrapper)
              }
            >
              {child}
            </div>
          </div>
        ))}
        <div className={classNames(styles.buttonContainer)}>{buttonGroup}</div>
      </form>
    </React.Fragment>
  );
};

export default Form;
