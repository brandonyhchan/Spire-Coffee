import React, { useState } from "react";
import { SelectOptions } from "./RadioFilter";
import FilterComponent from "component/common/Filter/FilterComponent/FilterComponent";
import FilterOption from "component/common/Filter/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/Filter/FilterComponent/FilterComponent.module.scss";

type CheckboxFilterPropsType = {
  options: SelectOptions[];
  type: string;
  text: string;
  filterSelection: SelectOptions[];
  handleFilter(data: SelectOptions[]): void;
  label: string[];
  mobileFiltersOpen: boolean;
  searchParams: URLSearchParams;
  setSearchParams(data: URLSearchParams): void;
};

const CheckboxFilter = ({
  options,
  type,
  text,
  filterSelection,
  handleFilter,
  label,
  mobileFiltersOpen,
  searchParams,
  setSearchParams,
}: CheckboxFilterPropsType) => {
  const list = [
    { label: label[0], option: options[0] },
    { label: label[1], option: options[1] },
    { label: label[2], option: options[2] },
  ];

  const [checked, setChecked] = useState(new Array(list.length).fill(false));

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item
    );
    setChecked(updatedCheckedState);
  };

  function handlePriceCheckbox(
    position: number,
    array: boolean[],
    options: SelectOptions
  ) {
    array.filter((item, index) => {
      if (index === position) {
        if (!item) {
          handleFilter([...filterSelection, options]);
          checkSearchParams(options);
        } else {
          handleFilter(filterSelection.filter((a) => a !== options));
          checkSearchParams(options);
        }
      }
      setSearchParams(searchParams);
    });
  }

  function checkSearchParams(options: SelectOptions) {
    const values = searchParams.getAll("price");
    if (!values.includes(options)) {
      searchParams.append("price", options);
    } else {
      values.splice(
        values.findIndex((e) => e === options),
        1
      );
      searchParams.delete("price");
      if (values.length !== 0) {
        for (let i = 0; i < values.length; i++) {
          searchParams.append("price", values[i]);
        }
      }
    }
  }

  return (
    <FilterComponent text={text} mobileFiltersOpen={mobileFiltersOpen}>
      {list.map((item, index) => (
        <FilterOption
          key={index}
          className={classNames(styles.listWrapper)}
          text={item.label}
          type={type}
          value={item.option}
          checked={checked[index]}
          onChange={() => {
            handleOnChange(index);
            handlePriceCheckbox(index, checked, item.option);
          }}
        />
      ))}
    </FilterComponent>
  );
};

export default CheckboxFilter;
