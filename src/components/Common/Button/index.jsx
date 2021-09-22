import { useReactiveVar } from "@apollo/client";
import { userVar } from "graphql/reactiveVar";

const Button = (props) => {
  const {
    notification,
    percentage,
    title,
    children,
    width,
    className,
    align,
    disabled = false,
    reversed = false,
    theme = "atelier-blue",
    size = "sm",
    ...newProps
  } = props;

  const { isAdmin } = useReactiveVar(userVar);

  const percentageThresholdsToColor = (percentage) => {
    const thresholds = { LOWER: 33, UPPER: 75 };
    let color;
    if (percentage < thresholds.LOWER) {
      color = "orange";
    } else if (
      percentage >= thresholds.LOWER &&
      percentage <= thresholds.UPPER
    ) {
      color = "blue";
    } else {
      color = "green";
    }
    return color;
  };

  return (
    <button
      {...newProps}
      title={title || ""}
      style={{ width }}
      className={`button ${isAdmin ? "admin" : ""} ${
        disabled ? "disabled" : reversed ? `reversed-${theme}` : theme
      } ${!!size ? `${size}` : "small"} ${
        align === "center" ? "textAlignCenter" : ""
      } ${!!className ? className : ""}
				`}
    >
      {!!notification && (
        <div className={`notificationWrapper ${theme}`}>
          <span className="notificationText">{notification}</span>
        </div>
      )}
      {!notification && !!percentage && (
        <div
          className={`percentageWrapper 
					`}
        >
          <span
            className={`percentageText ${percentageThresholdsToColor(
              percentage
            )}`}
          >
            {percentage}%
          </span>
          <svg
            viewBox="0 0 36 36"
            className={`percentage ${percentageThresholdsToColor(percentage)}`}
          >
            <path
              d="M18 2.0845
							a 15.9155 15.9155 0 0 1 0 31.831
							a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
