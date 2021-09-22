import { Button, Logo } from "components";
import styles from "./styles.module.scss";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <Logo />
    </div>
  </header>
);

export default Header;
