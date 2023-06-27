import React, { useState } from "react";
import Button from "component/common/Button";

import classNames from "classnames";
import styles from "./account.module.scss";
import strings from "config/strings";

type FormPropsType = {
  handleEditAccount: (event: React.FormEvent<HTMLFormElement>) => void;
  edit: boolean;
  children: JSX.Element[];
  handleEditButton: () => void;
  editInfoError: boolean;
  editPassword: boolean;
  setEditPassword: () => void;
};

const Form = ({
  handleEditAccount,
  edit,
  children,
  handleEditButton,
  editInfoError,
  editPassword,
  setEditPassword,
}: FormPropsType) => {
  return (
    <React.Fragment>
      <form
        noValidate
        onSubmit={handleEditAccount}
        className={classNames(styles.accountForm)}
      >
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
        {edit ? (
          <div className={classNames(styles.editButtonGroup)}>
            <Button
              buttonType="reset"
              text={"Cancel"}
              onClick={handleEditButton}
            />
            <Button text={"Save"} buttonType="submit" />
          </div>
        ) : null}
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
