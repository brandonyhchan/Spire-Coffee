import React, { ChangeEvent, useState } from "react";
import Filter from "component/common/Filter/Filter";
import List from "component/common/List/List";
import strings from "config/strings";
import classNames from "classnames";
import styles from "component/common/Filter/Filter.module.scss";

const FilterByAmenities = () => {
  const [checked, setChecked] = useState(""); // pass in the state?

  return (
    <Filter text={strings.explore.filterByAmenities}>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities1}
        value={strings.list.amenities1}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities2}
        value={strings.list.amenities2}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities3}
        value={strings.list.amenities3}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities4}
        value={strings.list.amenities4}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities5}
        value={strings.list.amenities5}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
      <List
        className={classNames(styles.listWrapper)}
        text={strings.list.amenities6}
        value={strings.list.amenities6}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.value)
        }
      ></List>
    </Filter>
  );
};

export default FilterByAmenities;
