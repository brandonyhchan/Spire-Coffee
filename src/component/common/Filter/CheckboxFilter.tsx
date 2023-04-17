import React, { useState } from "react";
import { SelectOptions } from "./RadioFilter";
import FilterComponent from "component/common/FilterComponent/FilterComponent";
import FilterOption from "component/common/FilterOption/FilterOption";
import classNames from "classnames";
import styles from "component/common/FilterComponent/FilterComponent.module.scss";

type CheckboxFilterPropsType = {
  options: SelectOptions[];
  type: string;
  text: string;
  filterSelection: SelectOptions[];
  handleFilter(data: SelectOptions[]): void;
  label: string[];
};

const CheckboxFilter = ({
  options,
  type,
  text,
  filterSelection,
  handleFilter,
  label,
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

  function testFunc(
    position: number,
    array: boolean[],
    options: SelectOptions
  ) {
    array.filter((item, index) => {
      if (index === position) {
        if (!item) {
          handleFilter([...filterSelection, options]);
        } else {
          handleFilter(filterSelection.filter((a) => a !== options));
        }
      }
    });
  }
  return (
    <FilterComponent text={text}>
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
            testFunc(index, checked, item.option);
          }}
        />
      ))}
    </FilterComponent>
  );
};

export default CheckboxFilter;
