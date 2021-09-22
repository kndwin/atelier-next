import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { chatVar, userVar } from "graphql/reactiveVar";

import { Button } from "components";
import styles from "./styles.module.scss";

import Image from "public/svg/image.svg";
import Attachment from "public/svg/attachment.svg";
import Emoji from "public/svg/emoji.svg";
import Map from "public/svg/map-icon.svg"
import Exclaimation from 'public/svg/exclaimation.svg'
import TwoCircles from 'public/svg/two-circles.svg'

const ChatBox = (props) => {
  const { scrollBottomRef } = props;
  const { isAdmin} = useReactiveVar(userVar);

  return (
    <div
      className={`${styles.chatBoxWrapper} 
			${isAdmin ? styles.admin : ""}`}
    >
      <div className={styles.chatBox}>
        <div className={styles.flex}>
          {isAdmin && <ChatInfo />}
					<ChatInput scrollBottomRef={scrollBottomRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

const ChatInfo = () => {
  return (
		<div className={styles.chatInfoWrapper}>
			<div className={styles.chatInfo}>
				<div className={styles.infoWrapper}>
					<p className={styles.title}>BRAND:</p>
					<p className={styles.content}>BEAR</p>
				</div>
				<div className={styles.infoWrapper}>
					<p className={styles.title}>PRODUCT:</p>
					<p className={styles.content}>FACE OIL</p>
				</div>
				<div className={styles.infoWrapper}>
					<p className={styles.title}>COMPONENT:</p>
					<p className={styles.content}>FORMULATION</p>
				</div>
			</div>
			<Button width='100%' align='center'>
				Set delay
			</Button>
		</div>
  );
};

const ChatInput = (props) => {
  const { scrollBottomRef } = props;
  const [chatContent, setChatContent] = useState("");
  const chatData = useReactiveVar(chatVar);
	const { isAdmin } = useReactiveVar(userVar)

  const submitChat = () => {
    const lastChat = chatData.pop();
    const chatDatatoPush = {
      name: "Kevin Nguyen",
      time: Date.now(),
      chatContent,
    };

    const { type, stage } = lastChat;

    if (type === "BRIEF_ACCEPTED") {
      const currStage = stage.length;
      if (currStage === 1) {
        lastChat.stage.push(chatDatatoPush);
        chatVar([...chatData, lastChat]);
      } else {
        chatData.push(lastChat);
        chatVar([...chatData, { ...chatDatatoPush, type: "CHAT" }]);
      }
    } else {
      chatData.push(lastChat);
      chatVar([
        ...chatData,
        {
          name: "Kevin Nguyen",
          time: Date.now(),
          chatContent,
          type: "CHAT",
        },
      ]);
    }

    scrollBottomRef.current.scrollIntoView({ behaviour: "auto" });
    setChatContent("");
  };
  return (
    <div className={styles.chatInput}>
      <div className={styles.textAreaWrapper}>
        <textarea
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key == "Enter" && !e.shiftKey) {
              submitChat();
            }
          }}
          value={chatContent}
          onChange={(e) => setChatContent(e.target.value)}
          placeholder="Type Here..."
          className={styles.textArea}
        />
      </div>
      <div className={styles.bottomChatBox}>
        <div className={styles.chatBoxIcons}>
          <Image
            className={styles.icon}
          />
          <Attachment
            className={styles.icon}
          />
					{isAdmin && (
						<>
							<Map 
								className={styles.icon}
							/>
							<Exclaimation 
								className={styles.icon}
							/>
							<TwoCircles
								className={styles.icon}
							/>
						</>
					)}
          <Emoji
            className={styles.icon}
          />
        </div>
        <Button
          onClick={() => submitChat()}
          width="12em"
          align="center"
          className={styles.submitButton}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
