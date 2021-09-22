import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { chatVar, drawerMessageVar, userVar } from "graphql/reactiveVar";
import { Button } from "components";

import HeartIcon from "public/svg/heart-icon.svg";
import FlagIcon from "public/svg/flag-icon.svg";
import ShareArrowIcon from "public/svg/share-arrow-icon.svg";
import HeartCounterIcon from "public/svg/heart-with-counter-icon.svg";
import AtelierIcon from "public/svg/atelier-icon.svg";
import Cloud from "public/svg/cloud-2.svg";

const PreviousChat = (props) => {
  const chatData = useReactiveVar(chatVar);
  const { scrollBottomRef } = props;
  const [latestComment, setLatestComment] = useState("");
  const { isAdmin } = useReactiveVar(userVar);

  useEffect(() => {
    setLatestComment(Math.max(...chatData.map(({ time }) => new Date(time))));
  }, [chatData]);

  useEffect(() => {
    scrollBottomRef.current.scrollIntoView({ behaviour: "auto" });
    setLatestComment(Math.max(...chatData.map(({ time }) => new Date(time))));
  }, []);

  return (
    <div className={styles.previousChatWrapper}>
      <div
        className={`${styles.previousChat} 
				${isAdmin ? styles.admin : ""}`}
      >
        {chatData?.map(
          ({ attachment, name, time, chatContent, type, stage }, index) => (
            <div key={type + index}>
              {type === "BRIEF_ACCEPTED" && (
                <div className={`${styles.briefAccepted}`}>
                  {stage.map(
                    (
                      {
                        name,
                        chatContent,
                        type,
                        choices,
                        question,
												attachment,
                        isAdmin: isContentForAdmin,
                      },
                      index
                    ) => (
                      <>
                        {type === "QUESTION" &&
                          isAdmin &&
                          isContentForAdmin && (
                            <QuestionContent
                              circle
                              cloud
                              atelierIcon
                              key={question}
                              choices={choices}
                              question={question}
                            />
                          )}
												{type === 'CHAT' && (
													<ChatContent 
														key={index + type}
														circle
														line={time !== latestComment}
														name={name}
														chatContent={chatContent}
														attachment={attachment}
														time={time}
													/>
												)}
                      </>
                    )
                  )}
                </div>
              )}
              {type === "CHAT" && (
                <div key={time.toString() + index} className={`${styles.chat}`}>
                  <ChatContent
										index={index + type}
                    circle
                    line={time !== latestComment}
                    index={index}
                    name={name}
                    chatContent={chatContent}
                    attachment={attachment}
                    time={time}
                  />
                </div>
              )}
            </div>
          )
        )}
        <TestButtons />
        <div ref={scrollBottomRef} />
      </div>
    </div>
  );
};

export default PreviousChat;

export const ChatContent = (props) => {
  const {
    time,
    attachment,
    chatContent,
    index,
    name,
    atelierIcon,
    circle,
    line,
  } = props;
  return (
    <div key={time.toString() + index}>
      <div className={styles.profileNameAndDateWrapper}>
        {circle && <div className={styles.circle} />}
        {line && <div className={styles.line} />}
        <img
          className={styles.profilePic}
          src="https://github.com/kndwin.png"
          alt="Profile image"
        />
        <div className={styles.nameAndTimeWrapper}>
          <p className={styles.name}>{name}</p>
          <p className={styles.time}>{new Date(time).toDateString()}</p>
          <p className={styles.chatContent}>{chatContent}</p>
          {!!attachment && (
            <a className={styles.attachment} href={attachment.href}>
              {attachment.name}
            </a>
          )}
        </div>
      </div>
      <div className={styles.hoverIcons}>
        <HeartIcon className={styles.icon} />
        <FlagIcon className={styles.icon} />
        <ShareArrowIcon className={styles.icon} />
      </div>
      <div className={styles.heartCounter}>
        <HeartCounterIcon />
        <p className={styles.counter}>2</p>
      </div>
      {atelierIcon && <AtelierIcon className={styles.atelierIcon} />}
    </div>
  );
};

const QuestionContent = (props) => {
  const { choices, question, cloud, atelierIcon, circle } = props;
  return (
    <div className={styles.question}>
      {circle && <div className={`${styles.circle} ${styles.reversed}`} />}
      {cloud && <Cloud className={styles.cloud} />}
      {atelierIcon && (
        <AtelierIcon className={`${styles.atelierIcon} ${styles.reversed}`} />
      )}
      <p className={`${styles.questionText}`}>{question}</p>
      <div className={styles.buttons}>
        {choices.map((choice) => (
          <Button reversed width="12em" align="center">
            {choice}
          </Button>
        ))}
      </div>
    </div>
  );
};

const TestButtons = () => {
  const chatData = useReactiveVar(chatVar);
  const triggerBrief = ({ stage }) => {
    if (stage === 1) {
      chatVar([
        ...chatData,
        {
          type: "BRIEF_ACCEPTED",
          time: Date.now() - 30 * 1000 * 60 * 60 * 24,
          stage: [
            {
              time: Date.now() - 30 * 1000 * 60 * 60 * 24,
              isAdmin: true,
              question: "Do you want to accept this brief",
              type: "QUESTION",
              choices: ["ACCEPT", "DECLINE"],
            },
          ],
        },
      ]);
      drawerMessageVar("PRODUCT_CHAT_BRIEF_ACCEPTED");
    } else {
      const lastChat = chatData.pop();
      lastChat.stage.push({
        name: "Nick Benson",
        time: Date.now(),
        chatContent:
          "Hi Cat! Good news :), Our first sample is here. Would you like me to send it to the following address?",
        address: "85 William St, Darlinghurst, NSW Ausralia, 2010",
        options: {
          "1st": "Yes",
          "2nd": "Edit Address",
        },
      });
      chatData.push(lastChat);
      chatVar([...chatData]);
      drawerMessageVar("PRODUCT_CHAT_PROGRESS_FORMULATION_TUBE");
    }
  };

  const resetChat = () => {
    chatVar([
      {
        name: "Cat Tsang",
        time: Date.now() - 60 * 1000 * 60 * 60 * 24,
        attachment: {
          href: "#",
          name: "VIEW BRIEF HERE",
        },
        chatContent: "Formulation brief submitted",
        type: "CHAT",
      },
    ]);
    drawerMessageVar("PRODUCT_CHAT_WELCOME");
  };

  return (
    <div className={styles.testButtons}>
      <Button onClick={() => resetChat()}>Reset Chat</Button>
      <Button onClick={() => triggerBrief({ stage: 1 })}>
        Brief accepted stage 1
      </Button>
      <Button onClick={() => triggerBrief({ stage: 3 })}>
        Brief accepted stage 3
      </Button>
      {[
        "PRODUCT_CHAT_PROGRESS_FORMULATION_PLANET",
        "PRODUCT_CHAT_PROGRESS_FORMULATION_TUBE",
        "PRODUCT_CHAT_PROGRESS_FORMULATION_BOTTLE",
        "PRODUCT_CHAT_PROGRESS_FORMULATION_BOX",
        "TIMELINE",
      ].map((type) => (
        <Button key={type} onClick={() => drawerMessageVar(type)}>
          {type.replaceAll("_", " ")}
        </Button>
      ))}
      <Button>
        Trigger sample arrival
      </Button>
    </div>
  );
};
