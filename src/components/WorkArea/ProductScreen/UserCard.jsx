import { useReactiveVar } from "@apollo/client";
import { userVar } from "graphql/reactiveVar";
import { useState } from "react";
import Pencil from "public/svg/pencil.svg";
import styles from "./styles.module.scss";

const UserCard = (props) => {
  const { profilePic, shortIntro, longIntro } = props;
  const [clicked, setClicked] = useState(false);
  const { isAdmin } = useReactiveVar(userVar);
  return (
    <div
      onClick={() => setClicked(!clicked)}
      className={`${clicked ? styles.userCardExpanded : styles.userCard}`}
    >
      <img src={profilePic} alt="Profile picture" />
      <div className={styles.description}>
        <p className={styles.shortIntro}>{shortIntro}</p>
        <p
          className={styles.longIntro}
          style={clicked ? {} : { display: "none" }}
        >
          {longIntro}
        </p>
        {isAdmin && (
          <Pencil onClick={() => console.log("Edit")} className={styles.edit} />
        )}
      </div>
    </div>
  );
};

export default UserCard;
