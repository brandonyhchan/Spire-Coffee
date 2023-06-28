import React, { useState } from "react";
import Button from "component/common/Button";

import classNames from "classnames";
import styles from "./account.module.scss";
import strings from "config/strings";

type FormPropsType = {
  handleEditAccount: (event: React.FormEvent<HTMLFormElement>) => void;
  edit: boolean;
  children: JSX.Element[];
  editInfoError: boolean;
  editPassword: boolean;
  setEditPassword: () => void;
  className?: string;
  buttonGroup?: JSX.Element;
};

const Form = ({
  handleEditAccount,
  edit,
  children,
  editInfoError,
  editPassword,
  setEditPassword,
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
        {editInfoError && (
          <span className={classNames(styles.errorMessage)}>
            {strings.global.errorMessage.message}
          </span>
        )}
        {edit && !editPassword && (
          <label onClick={setEditPassword}>Change Password</label>
        )}
      </form>
    </React.Fragment>
  );
};

export default Form;
