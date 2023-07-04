import React, { useState } from "react";
import classNames from "classnames";
import styles from "./account.module.scss";
import strings from "config/strings";

type FormPropsType = {
  handleEditAccount: (event: React.FormEvent<HTMLFormElement>) => void;
  edit: boolean;
  children: JSX.Element[];
  editError: boolean;
  className?: string;
  buttonGroup?: JSX.Element;
};

const Form = ({
  handleEditAccount,
  edit,
  children,
  editError,
  className,
  buttonGroup,
}: FormPropsType) => {
  return (
    <React.Fragment>
      <form noValidate onSubmit={handleEditAccount} className={className}>
        {children.map((child, index) => (
          <div key={index} className={classNames(styles.formSectionContainer)}>
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
        {buttonGroup}
        {editError && edit && (
          <span className={classNames(styles.errorMessage)}>
            {strings.global.errorMessage.message}
          </span>
        )}
      </form>
    </React.Fragment>
  );
};

export default Form;
