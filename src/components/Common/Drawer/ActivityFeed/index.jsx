import { useReactiveVar } from "@apollo/client";
import { activityFeedVar } from "graphql/reactiveVar/activityFeedVar";
import { Button } from "components";
import styles from "./styles.module.scss";
import { productVar } from "graphql/reactiveVar";

const ActivityFeed = (props) => {
	const { all, product } = props;
	const { product: productName } = productVar()
  const activityFeed = useReactiveVar(activityFeedVar);

  const timeSince = (d1, d2 = new Date()) => {
    const elapsed = d2 - d1;
    const units = [
      { type: "second", ms: 1000 },
      { type: "minute", ms: 60 * 1000 },
      { type: "hour", ms: 60 * 60 * 1000 },
      { type: "day", ms: 24 * 60 * 60 * 1000 },
      { type: "month", ms: (24 * 60 * 60 * 1000 * 365) / 12 },
      { type: "year", ms: 24 * 60 * 60 * 1000 * 365 },
    ];

    for (let u = 1; u < units.length; u++) {
      const { ms } = units[u];
      if (Math.abs(elapsed) < ms) {
        const { type, ms: shorterMs } = units[u - 1];
        if (type === "minute" || type === "hour") {
          return "Today";
        }
        return `${Math.floor(elapsed / shorterMs)} ${type}${
          elapsed > 2 * shorterMs ? "s" : ""
        } ago`;
      }
    }
  };

  return (
    <div className={styles.activityFeedWrapper}>
      <p className={styles.title}>Activity Feed</p>
      {!!all && (
        <>
          {activityFeed["ALL"].map(
            ({ product, time, content, track, image }) => (
              <div className={styles.activity}>
                <div className={styles.imageWrapper}>
                  <div className={styles.circle}>
                    <img className={styles.image} src={image} />
                  </div>
                </div>
                <div className={styles.text}>
                  <p className={styles.date}>{timeSince(time)}</p>
                  <p className={styles.product}>{product}</p>
                  <p className={styles.content}>{content}</p>
                  {!!track && (
                    <Button reversed width="100%" align="center" size="small">
                      Track {track} Here
                    </Button>
                  )}
                </div>
              </div>
            )
          )}
        </>
      )}
      {!!product && (
        <>
          <p className={styles.title}>{productName.name}</p>
          {activityFeed["PRODUCT"].map(
            ({ product, time, content, track, image }) => (
              <div className={styles.activity}>
                <div className={styles.imageWrapper}>
                  <div className={styles.circle}>
                    <img className={styles.image} src={image} />
                  </div>
                </div>
                <div className={styles.text}>
                  <p className={styles.date}>{timeSince(time)}</p>
                  <p className={styles.product}>{product}</p>
                  <p className={styles.content}>{content}</p>
                  {!!track && (
                    <Button reversed width="100%" align="center" size="small">
                      Track {track} Here
                    </Button>
                  )}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default ActivityFeed;
