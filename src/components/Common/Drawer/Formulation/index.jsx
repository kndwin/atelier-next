import Tube from "public/svg/tube.svg";
import Bottle from "public/svg/bottle.svg";
import Box from "public/svg/box.svg";
import styles from "./styles.module.scss";
import {useReactiveVar} from "@apollo/client";
import {userVar} from "graphql/reactiveVar";

const Formulation = (props) => {
	const { isAdmin} = useReactiveVar(userVar)
  const { planet, tube, bottle, box } = props;
	const data = [
		{ title: "raw materials", data: "30 days" },
		{ title: "sample iterations", data: "5 iterations" },
		{ title: "sample time", data: "30 days" },
		{ title: "overall sampling time", data: "60 days" },
		{ title: "delivery time", data: "14 days" },
		{ title: "final sample time", data: "60 days" },
	]
	return (
		<div className={`${styles.formulationWrapper} ${isAdmin ? styles.admin : ""}`}>
      <p className={styles.title}>
        Product <br /> progress: <br /> Formulation
      </p>
      <p className={styles.subtitle}>Live Tracking</p>
      <p className={styles.description}>
        This is our planet chart. It represent the unknowns and knowns within
        our sampling and protyping process. The closer the orbiting moon is to
        the centre of the planet the few unknowns and the closer we are to
        certainty of the timing and fidelity of sampling.
      </p>
      {planet && (
        <>
          <div className={styles.planetWrapper}>
            <div className={styles.center} />
            <div className={`${styles.orbit} ${styles.rad1}`} />
            <div className={`${styles.orbit} ${styles.rad2}`} />
            <div
              className={`${styles.orbit} ${styles.rad3} ${styles.planet}`}
            />
            <div className={`${styles.orbit} ${styles.rad4}`} />
            <div className={`${styles.orbit} ${styles.rad5}`} />
            <div className={`${styles.orbit} ${styles.rad6} `} />
            <div className={styles.planet} />
          </div>
          <div className={styles.legends}>
            <p className={styles.moon}> - Moon</p>
            <p className={styles.planet}> - Planet</p>
          </div>
        </>
      )}
      {(tube || bottle || box) && (
        <div className={styles.imageAndDescriptionWrapper}>
          <div className={styles.circle}>
            <div className={styles.svgWrapper}>
              {tube && <Tube className={styles.tube} />}
              {bottle && <Bottle className={styles.bottle} />}
              {box && <Box className={styles.box} />}
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            {data.map(({ title, data }) => (
              <div key={title} className={styles.description}>
                <p className={styles.title}>{title}</p>
                <p className={styles.data}>{data}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulation;
