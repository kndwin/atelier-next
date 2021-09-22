import styles from "./styles.module.scss";
import MagnifyingGlass from "public/svg/magnifying-glass.svg";

const SearchBar = (props) => {
  const { placeholder, className, ...newProps } = props;
  return (
    <div className={`${styles.searchBar} ${className}`} {...newProps}>
      <input placeholder={placeholder} className={styles.input} type="text" />
      <MagnifyingGlass className={styles.icon} />
    </div>
  );
};

export default SearchBar;
