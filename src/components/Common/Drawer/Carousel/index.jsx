import React, { useState } from "react";
import styles from "./styles.module.scss";

const Carousel = (props) => {
  const { children, initSlide = 0, small } = props;
  const maxItem = React.Children.count(children);
  const [slide, setSlide] = useState(initSlide ?? 0);

  return (
		<div className={`${styles.carouselWrapper} ${!!small ? styles.small : ""}`}>
      <div className={styles.content}>
        {children.map((props, i) => (
          <div
            className={slide === i ? styles.focus : styles.notFocus}
            key={i}
          >
            {props}
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {Array(maxItem)
          ?.fill("⬤")
          ?.map((dot, i) => (
            <div
							key={i}
              onClick={() => setSlide(i)}
              className={`${styles.dot} ${slide === i ? styles.dotFocus : ""}`}
            >
              {dot}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
