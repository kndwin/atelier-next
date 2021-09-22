import styles from "./styles.module.scss";

const Map = (props) => {
  const { lat, long } = props;
  return (
    <div className={styles.mapWrapper}>
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/view?zoom=15&center=-33.8780%2C151.2204&key=AIzaSyAg64rLu76af6YltSfU-PNPoy5L-rb_s8M"
      ></iframe>
    </div>
  );
};

export default Map;
