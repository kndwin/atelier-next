import styles from "./styles.module.scss";
const Table = (props) => {
  const { children, className, ...newProps } = props;
  return (
    <div
      className={`${styles.tableWrapper} ${!!className ? className : ""}`}
      {...newProps}
    >
      {children}
    </div>
  );
};

export default Table;

export const Header = (props) => {
  const { children, className, shadow, ...newProps} = props;
  return (
    <div
      className={`${styles.headerRow} ${!!className ? className : ""}
			${!!shadow ? styles.shadow : ''}
			`}
      {...newProps}
    >
      {children}
    </div>
  );
};

export const Row = (props) => {
  const { children, className, shadow, ...newProps } = props;
  return (
    <div
      className={`${styles.cellRow} ${!!className ? className : ""}
			${!!shadow ? styles.shadow : ''}
			`}
      {...newProps}
    >
      {children}
    </div>
  );
};

export const Cell = (props) => {
  const { children, className, bold, span, style, h6, ...newProps } = props;
  return (
    <div
			style={!!span ? {...style, gridColumn: `span ${span}` } : {style}}
      className={`${styles.tableCell} ${bold ? styles.bold : ""} ${
        !!className ? className : ""
      }
			${!!h6 ? styles.h6 : ''}
			`}
      {...newProps}
    >
      {children}
    </div>
  );
};
