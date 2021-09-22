import { userVar } from "graphql/reactiveVar";
import { useState } from "react";
import styles from "./styles.module.scss";

const Input = (props) => {
  const {
    children,
    warning,
    className,
    style,
    type,
    theme,
    disabled,
    width,
    ...newProps
  } = props;
  const [blur, setBlur] = useState(false);
  const { isAdmin } = userVar();

  return (
    <>
      <input
        disabled={disabled}
        onBlur={() => setBlur(true)}
        onFocus={() => setBlur(false)}
        style={!!width ? { ...style, width } : { ...style }}
        className={`${theme === "dark" ? styles.dark : styles.light} ${
          blur ? styles.blur : ""
        } ${!!className ? className : ""} ${isAdmin ? styles.admin : ""}
				`}
        type={type}
        {...newProps}
      >
        {children}
      </input>
      {!!warning && (
        <div
          style={{ border: "0px" }}
          className={`
					${theme === "dark" ? styles.dark : styles.light}
					${styles.warningWrapper}`}
        >
          <span className={`${styles.warning}`}>{warning}</span>
        </div>
      )}
    </>
  );
};

export default Input;
