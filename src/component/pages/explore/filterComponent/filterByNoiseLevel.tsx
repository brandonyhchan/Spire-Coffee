import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/List/List";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

const FilterByNoiseLevel = () => {
  const [checked, setChecked] = useState(""); // pass in the state?

  return (
    <Filter text={strings.explore.filterByNoiseLevel}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness1}
        value={strings.list.quietness1}
        checked={checked === strings.list.quietness1}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness2}
        value={strings.list.quietness2}
        checked={checked === strings.list.quietness2}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.quietness3}
        value={strings.list.quietness3}
        checked={checked === strings.list.quietness3}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
    </Filter>
  );
};

export default FilterByNoiseLevel;
