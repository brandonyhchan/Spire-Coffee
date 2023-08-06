import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLazyQuery } from "@apollo/client";
import { cafeMutation } from "support/graphqlServerApi";
import classNames from "classnames";
import NavBar from "component/common/NavbarAndFooter/NavBar";
import Form from "component/common/Form/Form";
import FormItem from "component/common/Form/FormItem";
import styles from "./addCafe.module.scss";
import strings from "config/strings";
import { SelectOptions } from "component/common/Filter/FilterType/RadioFilter";

const AddCafe = () => {
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [addCafe] = useLazyQuery(cafeMutation, {
    onError: (error) => {
      alert(error);
    },
    onCompleted: () => {
      console.log("Error in adding a cafe.");
    },
  });

  const [priceOption, setPriceOption] = useState<SelectOptions>();
  const [tableOption, setTableOption] = useState<SelectOptions>();
  const [cafeInfo, setCafeInfo] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
    website: "",
  });

  const handleAddCafe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCafe({
      variables: {
        name: cafeInfo.name,
        street: cafeInfo.street,
        city: cafeInfo.city,
        province: cafeInfo.province,
        postalCode: cafeInfo.postalCode,
        phoneNumber: cafeInfo.phoneNumber,
        website: cafeInfo.website,
        numTables: tableOption,
        price: priceOption,
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.currentTarget.value;
    setCafeInfo({
      ...cafeInfo,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.addCafe.helmet} />
      <NavBar />
      <div className={classNames(styles.container)}>
        <Form
          className={classNames(styles.addCafeForm)}
          handleForm={handleAddCafe}
          formType={"addCafe"}
        >
          {/* change to Label component after merge from branch 17*/}
          <span>Please fill out basic information about the cafe:</span>
          <FormItem
            type={"text"}
            handleChange={handleChange}
            name={"name"}
            text={strings.addCafe.name}
            placeholder={strings.addCafe.name}
          />
          <FormItem
            type={"text"}
            handleChange={handleChange}
            name={"street"}
            text={strings.addCafe.street}
            placeholder={strings.addCafe.street}
          />
          <FormItem
            type={"text"}
            handleChange={handleChange}
            name={"city"}
            text={strings.addCafe.city}
            placeholder={strings.addCafe.city}
          />
          <FormItem // I think this could be changed to a drop down?
            type={"text"}
            handleChange={handleChange}
            name={"province"}
            text={strings.addCafe.province}
            placeholder={strings.addCafe.province}
          />
          <FormItem
            type={"text"}
            handleChange={handleChange}
            name={"postalCode"}
            text={strings.addCafe.postalCode}
            placeholder={strings.addCafe.postalCode}
          />
          <FormItem
            type={"text"}
            handleChange={handleChange}
            name={"phoneNumber"}
            text={strings.addCafe.phoneNumber}
            placeholder={strings.addCafe.phoneNumber}
          />
          <FormItem
            type={"text"}
            handleChange={handleChange}
            name={"website"}
            text={strings.addCafe.website}
            placeholder={strings.addCafe.website}
          />
          {/* change to Label component after merge from branch 17*/}
          <span>Does the cafe have tables?</span>
          <FormItem
            type={"radio"}
            handleChange={() => setTableOption(SelectOptions.LOW)}
            name={"numberOfTables"}
            text={strings.list.amenities1}
            radio={true}
          />
          <FormItem
            type={"radio"}
            handleChange={() => setTableOption(SelectOptions.MEDIUM)}
            name={"numberOfTables"}
            text={strings.list.amenities2}
            radio={true}
          />
          <FormItem
            type={"radio"}
            handleChange={() => setTableOption(SelectOptions.HIGH)}
            name={"numberOfTables"}
            text={strings.list.amenities3}
            radio={true}
          />
          {/* change to Label component after merge from branch 17*/}
          <span>How expensive is the cafe?</span>
          <FormItem
            type={"radio"}
            handleChange={() => setPriceOption(SelectOptions.LOW)}
            name={"price"}
            text={strings.list.price4}
            radio={true}
          />
          <FormItem
            type={"radio"}
            handleChange={() => setPriceOption(SelectOptions.MEDIUM)}
            name={"price"}
            text={strings.list.price5}
            radio={true}
          />
          <FormItem
            type={"radio"}
            handleChange={() => setPriceOption(SelectOptions.HIGH)}
            name={"price"}
            text={strings.list.price6}
            radio={true}
          />
          {/* need to put number of tables options and price? */}
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddCafe;
