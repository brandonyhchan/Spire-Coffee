import classNames from "classnames";
import "../../../global.scss";
import styles from "./NavBar.module.scss";

type NavBarPropsType = {
  className?: string;
};

const navbar = ({ className }: NavBarPropsType) => (
  <div className={classNames(styles.navbar)}>NavBar</div>
);

export default navbar;
