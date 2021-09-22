import { userVar } from "graphql/reactiveVar";
import { useState } from "react";
import styles from "./styles.module.scss";

const Dropdown = (props) => {
  const {
    options,
    placeholder,
    disabled,
    className,
    setOption,
    size = "large",
    ...newProps
  } = props;
  const [clickedButton, setClickedButton] = useState(false);
  const [optionChosen, setOptionChosen] = useState();
  const setOptionAndLeave = (label, value) => {
    setOption(value);
    setClickedButton(false);
    setOptionChosen(label);
  };
  const { isAdmin } = userVar();
  return (
    <div
      className={`${styles.dropdown} ${className} ${
        isAdmin ? styles.admin : ""
      } ${disabled ? styles.disabled : ""}`}
      {...newProps}
    >
      <button
        disabled={disabled}
        onClick={() => setClickedButton(!clickedButton)}
        className={`${styles.dropbtn} ${size === "small" ? styles.small : ""}`}
      >
        {!!optionChosen ? optionChosen : placeholder}
      </button>
      <div
        className={clickedButton ? styles.dropdownContent : styles.displayNone}
      >
        {options.map(({ label, value }, index) => (
          <a
            key={`${value}-${index}}`}
            onClick={() => setOptionAndLeave(label, value)}
            href="#"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
