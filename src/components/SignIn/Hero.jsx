import styles from "./styles.module.scss";
import Cloud from "public/svg/orange-smiling-cloud.svg";
import Rainbow from "public/svg/green-rainbow.svg";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <p className={styles.p1}>welcome to</p>
      <p className={styles.atelier}>atelier</p>
      <h1 className={styles.h1}>The future of manufacturing</h1>
      <Rainbow className={styles.svg1}></Rainbow>
      <Cloud className={styles.svg2} />
    </div>
  );
};

export default Hero;
