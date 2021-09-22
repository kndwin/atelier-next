import styles from "./styles.module.scss";
import { timelineVar, userVar } from "graphql/reactiveVar";
import { useEffect, useState } from "react";
import {useReactiveVar} from "@apollo/client";

const Timeline = (props) => {
	const { isAdmin } = useReactiveVar(userVar)
  const [displayTimeline, setDisplayTimeline] = useState(timelineVar());
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!collapsed) {
      setDisplayTimeline(timelineVar());
    } else {
      const timeline = [...timelineVar()];
      let lastOccurance = 0;
      for (let i = 0; i < timeline.length - 2; i++) {
        if (timeline[i].status === "DONE") {
          if (i + 1 !== "DONE") {
            lastOccurance = i;
          }
        }
      }
      const viewMore = {
        status: "DONE",
        content: "View more",
        type: "PLUS",
      };
      const reducedTimeline = [
        timeline[0],
        viewMore,
        ...timeline.splice(lastOccurance + 1),
      ];
      setDisplayTimeline(reducedTimeline);
    }
  }, [collapsed]);

  return (
		<div className={`${styles.timelineWrapper} ${isAdmin ? styles.admin : ""}`}>
			{displayTimeline.map(({ type, status, content, time, last }) => (
				<>
					{type === "TITLE_TAG" && (
						<TimelineEvent
							tag="lg"
							line="bold"
							content={content}
							time={time}
						/>
					)}
					{type === "POINT" && (
						<>
							{status === "DONE" && (
								<TimelineEvent
									content={content}
									time={time}
									dot="bold"
									line="faded"
									onClick={() => setCollapsed(true)}
								/>
							)}
							{status === "NOT_DONE" && (
								<TimelineEvent
									content={content}
									time={time}
									line={!last ? "faded" : null}
									dotHollow="faded"
									text="faded"
								/>
							)}
							{status === "ACTIVE" && (
								<TimelineEvent
									content={content}
									time={time}
									line="faded"
									dot="bold"
									activeDot="white"
								/>
							)}
							{status === "DELAYED" && (
								<TimelineEvent
									content={content}
									time={time}
									line="faded"
									activeDot="red"
									dot="bold"
								/>
							)}
						</>
					)}
					{type === "TAG" && (
						<>
							{status === "DONE" && (
								<TimelineEvent content={content} tag="sm" line="faded" />
							)}
							{status === "NOT_DONE" && (
								<TimelineEvent
									content={content}
									tag="sm"
									line="faded"
									text="faded"
									color="dark"
								/>
							)}
							{status === "ACTIVE" && (
								<TimelineEvent
									content={content}
									tag="sm"
									borderFaded
									line="faded"
								/>
							)}
							{status === "DELAYED" && (
								<TimelineEvent
									content={content}
									tag="sm"
									color="red"
									line="faded"
								/>
							)}
						</>
					)}
					{type === "PLUS" && (
						<TimelineEvent
							content={content}
							dot="bold"
							size="lg"
							onClick={() => setCollapsed(false)}
							plus
							line="faded"
						/>
					)}
				</>
			))}
			<div className={styles.gradient} />
		</div>
  );
};

export default Timeline;

const TimelineEvent = (props) => {
  const {
    content,
    time,
    tag,
    dot,
    dotHollow,
    line,
    activeDot,
    onClick,
    text,
    color,
    borderFaded,
    plus,
    size,
  } = props;
  return (
    <div
      onClick={onClick}
      className={`${tag ? styles.tag : ""} 
			${!!onClick ? styles.cursor : ""}
			${tag === "lg" ? styles.large : ""}
			${tag === "sm" ? styles.small : ""}
			${!tag ? styles.default : ""}
			${color === "dark" ? styles.dark : ""}
			${color === "red" ? styles.red : ""}
			${borderFaded ? styles.borderFaded : ""}
			`}
    >
      {!!dot && (
        <div
          className={`${styles.dot} ${dot === "faded" ? styles.faded : ""} 
					${size === "lg" ? styles.large : ""}`}
        />
      )}
      {!!dotHollow && (
        <div
          className={`${styles.dotHollow} 
					${dotHollow === "faded" ? styles.faded : ""}`}
        />
      )}
      {!!line && (
        <div
          className={`${styles.line} ${line === "faded" ? styles.faded : ""}`}
        />
      )}
      {!!plus && <div className={`${styles.plus}`} />}
      {!!activeDot && (
        <div
          className={`${styles.activeDot} 
					${activeDot === "white" ? styles.white : ""}
					${activeDot === "red" ? styles.red : ""}
					`}
        />
      )}

      <p
        className={`${styles.content} ${text === "faded" ? styles.faded : ""}
				${!!time ? styles.bold : ""}
				`}
      >
        {content}
      </p>
      <p className={styles.date}>{!!time && new Date(time).toDateString()}</p>
    </div>
  );
};
