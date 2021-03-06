import { Link } from "components";
import styles from "./styles.module.scss";

const Logo = () => {
  return (
    <Link className={styles.logo} href="#">
      <svg
        className={`${styles.iconLogo}`}
        id="ATELIER_LOGO"
        data-name="ATELIER LOGO"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
      >
        <rect
          id="Rectangle_11"
          data-name="Rectangle 11"
          width="35"
          height="35"
          rx="3"
          fill={"#0069f1"}
        />
        <g
          id="Group_3"
          data-name="Group 3"
          transform="translate(11.585 12.413)"
        >
          <path
            id="Path_1"
            data-name="Path 1"
            d="M35.951,36.347,31,35.018,29.89,36.347l-1.56-.413L34.713,28.3l1.393.361,1.7,9.813-1.547-.426Zm-.271-1.6-.774-4.41-2.876,3.43Z"
            transform="translate(-28.33 -28.3)"
            fill={"#fff"}
          />
        </g>
      </svg>
    </Link>
  );
};

export default Logo;
