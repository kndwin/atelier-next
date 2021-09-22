import { inProductionVar } from "graphql/reactiveVar/inProductionVar";
import styles from "./styles.module.scss";
import Map from "components/Common/Map";
import Status from "components/Common/Status";
import { modalVar, userVar } from "graphql/reactiveVar";
import Button from "components/Common/Button";
import Plus from "public/svg/plus-box-icon.svg";

const ProductTimeline = (props) => {
  const { isAdmin } = userVar();
  return (
    <div
      className={`${styles.productTimelineWrapper} ${
        isAdmin ? styles.admin : ""
      }`}
    >
      {inProductionVar().map(({ title, date, type, payload }, index) => (
        <Event
          title={title}
          date={date}
          payload={payload}
          type={type}
          dot
          line={index != inProductionVar().length - 1 || isAdmin}
        />
      ))}
      {isAdmin && (
        <div
          className={styles.addPost}
          onClick={() =>
            modalVar({
              ...modalVar(),
              isOpen: true,
              type: "UPDATE_PRODUCT_EVENT",
            })
          }
        >
          <Plus className={styles.icon} />
          Click to add a post here
        </div>
      )}
    </div>
  );
};

export default ProductTimeline;

const Event = (props) => {
  const { dot, line, type, payload, title, date } = props;
  return (
    <div className={styles.event}>
      {dot && (
        <div
          className={`${styles.dot} ${
            type === "DELAYED" ? styles.delayed : ""
          }`}
        />
      )}
      {line && <div className={styles.line} />}

      <div className={styles.contentWrapper}>
        <p
          className={`${styles.date} ${
            type === "DELAYED" ? styles.delayed : ""
          }`}
        >
          {new Date(date).toDateString()}
        </p>

        <div>
          <p
            className={`${styles.title} ${
              type === "DELAYED" ? styles.delayed : ""
            }`}
          >
            {title}
          </p>
          {type == "TEXT" && <div className={styles.text}>{payload}</div>}
          {type == "DELAYED" && <div className={styles.text}>{payload}</div>}
          {type == "IMAGE" && (
            <div className={styles.imagesWrapper}>
              <p className={styles.text}>{payload.caption}</p>
              <div className={styles.images}>
                {payload.images.map((path) => (
                  <img className={styles.image} src={path} />
                ))}
              </div>
            </div>
          )}
          {type == "MAP" && (
            <div className={styles.mapWrapper}>
              <p className={styles.text}>{payload.caption}</p>
              <div className={styles.map}>
                <Map
                  lat={payload.coordinates.lat}
                  long={payload.coordinates.long}
                />
              </div>
              <Status color="blue">Arrives on tues aug 18th</Status>
              <Button
                reversed
                size="small"
                onClick={() => modalVar({ isOpen: true, type: "PROGRESS_MAP" })}
              >
                Full screen
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
