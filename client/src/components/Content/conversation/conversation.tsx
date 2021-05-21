import React, {useEffect, useRef} from "react";
import styled from "@emotion/styled";
import {ConversationProps} from "./index";
import backgroundImage from "../../../img/comics.png";
import Message from "./message";

const Conversation: React.FC<ConversationProps> = ({ currentConversation }) => {
    const messageGroupRef = useRef<HTMLDivElement>(null)
    const messagesList = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (messageGroupRef.current as HTMLDivElement).scrollTop = (messagesList.current as HTMLDivElement).offsetHeight;
    })

    return (
        <ConversationWrapper>
            <BackgroundWrapper />
            <ResizeWrapper>
                <MessageGroup ref={messageGroupRef}>
                    <EmptySpace />
                    <MessageList ref={messagesList}>
                        {currentConversation?.conversation.map((message, key) =>
                            <Message
                                key={key}
                                type={message.type}
                                value={message.value}
                                created={message.created}
                                isAuthor={message.userExtId !== currentConversation.contactExtId}
                            />)}
                    </MessageList>
                </MessageGroup>
            </ResizeWrapper>
        </ConversationWrapper>
    )
}

const ConversationWrapper = styled("div")`
  position: relative;
  height: 100%;
`

const BackgroundWrapper = styled("div")`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.06;
  height: 100%;
  background-image: url(${backgroundImage});
  background-repeat: repeat-x;
`

const ResizeWrapper = styled("div")`
  position: relative;
  flex: 1 1 0;
  height: 100%;
`

const MessageGroup = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`

const EmptySpace = styled("div")`
  flex: 1 1 auto;
  min-height: 12px;
`

const MessageList = styled("div")`
`


export default Conversation
