import React from "react";
import styled from "@emotion/styled";
import {MessageCheck, TailIn, TailOut} from "../../../icons";
import {format} from "date-fns";

interface Message {
    key: number
    type: "image" | "text"
    value: string
    created: number
    isAuthor: boolean
}

const Message: React.FC<Message> = ({
    key,
    type,
    value,
    created,
    isAuthor
}) => {
    return (
        <ResizeWrapper>
            <InnerWrapper isAuthor={isAuthor}>
                <MessageWrapper isAuthor={isAuthor}>

                    <CornerWrapper isAuthor={isAuthor}>
                        { isAuthor ? <TailOut /> : <TailIn />}
                    </CornerWrapper>

                    { type === "text" ? (
                        <TextWrapper>
                            {value}
                            <EmptySpace isAuthor={isAuthor} />
                        </TextWrapper>
                    ): (
                        <ImageWrapper>
                            <img src={value}/>
                            <Gradient />
                        </ImageWrapper>
                    )}

                    <DetailsWrapper>
                        <MessageTime>
                            { format(created, "hh:mm") }
                        </MessageTime>
                        <MessageStatus>
                            <MessageCheck />
                        </MessageStatus>
                    </DetailsWrapper>

                </MessageWrapper>
            </InnerWrapper>
        </ResizeWrapper>
    )
}

const ResizeWrapper = styled("div")`
  margin-bottom: 12px;
  padding: 0 9% 0 9%;
`

type AuthorProps = {
    isAuthor: boolean
}

const InnerWrapper = styled("div")<AuthorProps>`
  position: relative;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  width: 60%;
  ${props => props.isAuthor ? `
    margin-left: auto;
    margin-right: 0;
  ` : `
    margin-left: 0;
    margin-right: auto;
  ` };
`

const MessageWrapper = styled("div")<AuthorProps>`
  position: relative;
  flex: 1;
  border-radius: 7.5px;
  ${props => props.isAuthor ? `
    margin-left: auto;
    margin-right: 0;
    border-top-right-radius: 0;
    background-color: #056162;
  ` : `
    margin-right: auto;
    margin-left: 0;
    border-top-left-radius: 0;
    background-color: #262d31;
  ` };
`

const CornerWrapper = styled("div")<AuthorProps>`
  position: absolute;
  display: block;
  top: 0;
  right: -8px;
  width: 8px;
  height: 13px;
  color: #056162;
  ${props => props.isAuthor ? `
    right: -8px;
    color: #056162;
  ` : `
    left: -8px;
    color: #262d31;
  ` };
`

const TextWrapper = styled("div")`
  position: relative;
  padding: 6px 7px 8px 9px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-size: 14.2px;
  line-height: 19px;
  color: #f1f1f2f2;

  direction: ltr;
  unicode-bidi: isolate;
  display: block;
`

const EmptySpace = styled("span")<AuthorProps>`
  display: inline-block;
  ${props => props.isAuthor ? `
    width: 74px;
  ` : `
    width: 54px;
  ` };
`

const ImageWrapper = styled("div")`
  padding: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  img {
    border-radius: 7.5px;
    width: 330px;
    max-height: 330px;
  }
`

const Gradient = styled("div")`
  position: absolute;
  bottom: 0;
  height: 30px;
  width: 100%;
  border-radius: 7.5px;
  z-index: 2;
  background: linear-gradient(0deg, rgba(50, 50, 50, 0.6), rgba(246, 244, 244, 0));
`

const DetailsWrapper = styled("div")`
  position: absolute;
  right: 8px;
  bottom: 6px;
  float: right;
  margin: -10px 0 -5px 4px;
  z-index: 15;
`

const MessageTime = styled("div")`
  display: inline-block;
  vertical-align: top;
  height: 15px;
  font-size: 11px;
  line-height: 15px;
  white-space: nowrap;
  color: rgba(241, 241, 242, 0.9);
`

const MessageStatus = styled("div")`
  display: inline-block;
  margin-left: 3px;
  color: #f1f1f2a1;
`


export default Message
