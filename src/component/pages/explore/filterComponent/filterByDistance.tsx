import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/List/List";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

const FilterByDistance = () => {
  const [checked, setChecked] = useState(""); // pass in the state?

  return (
    <Filter text={strings.explore.filterByDistance}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance1}
        value={strings.list.distance1}
        checked={checked === strings.list.distance1}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance2}
        value={strings.list.distance2}
        checked={checked === strings.list.distance2}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance3}
        value={strings.list.distance3}
        checked={checked === strings.list.distance3}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.distance4}
        value={strings.list.distance4}
        checked={checked === strings.list.distance4}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
    </Filter>
  );
};

export default FilterByDistance;
