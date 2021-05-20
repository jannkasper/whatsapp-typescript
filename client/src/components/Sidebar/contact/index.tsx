import React from "react";
import styled from "@emotion/styled";
import { connect, ConnectedProps } from "react-redux";
import { format, differenceInDays, isToday, isYesterday } from 'date-fns';
import { closeContactsNavigation, selectConversation, setSelectedContact } from "../../../actions";
import defaultAvatar from "../../../img/avatar.svg";
import { Photo } from "../../icons";

interface ContactProps {
    externalIdentifier: string
    name: string
    profileImage?: Image
    status: string
    lastMessage?: Message,
    isSelected: boolean
}

type AllProps = ContactProps & ConnectorProps

const Contact: React.FC<AllProps> = ({
     externalIdentifier,
     name,
     profileImage,
     status,
     lastMessage,
     isSelected ,
     setSelectedContact,
     closeContactsNavigation,
     selectConversation
}) => {
    let baseImage = defaultAvatar;
    if (profileImage) {
        baseImage = `data:${profileImage.type};base64,${profileImage.data}`
    }

    function convertDate(date: number | Date) {
        let localDate: number | Date = date;
        // if (typeof date === 'string') {
        //     localDate = Date.parse(date);
        // } else {
        //     localDate = date;
        // }
        if (isToday(localDate)) {
            return "Today";
        } else if (isYesterday(localDate)) {
            return "Yesterday";
        } else if ( differenceInDays(Date.now(), localDate) <= 7 ) {
            return format(localDate, "dddd");
        } else {
            return format(localDate, "dd/MM/yyyy");
        }
    }

    function determineMessageContent(message: Message) {
        switch(message.type) {
            case "image":
                return <><Photo /> Photo</>;
            default:
                return message.value;
        }
    }

    return (
        <ContactWrapper
            role="selectContact"
            defaultChecked={isSelected}
            onClick={() => {
                setSelectedContact({contactExtId: externalIdentifier });
                selectConversation({contactExtId: externalIdentifier })
                closeContactsNavigation();
            }}
        >
            <ImageWrapper>
                <img src={baseImage} alt="profileImage"/>
            </ImageWrapper>
            <DetailsWrapper>
                <NameWrapper>
                    <NameSpan>{name}</NameSpan>
                    { lastMessage ? <DateWrapper>{convertDate(lastMessage.created)}</DateWrapper> : null }
                </NameWrapper>
                <MessageWrapper>
                    <MessageInnerWrapper>
                        <MessageSpan>
                            { lastMessage ? determineMessageContent(lastMessage) : status }
                        </MessageSpan>
                    </MessageInnerWrapper>
                </MessageWrapper>
            </DetailsWrapper>
        </ContactWrapper>
    )
}

const ContactWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 72px;
  pointer-events: all;
  background-color: ${props => props.defaultChecked ? '#323739' : 'unset'};

  &:hover {
    background-color: #323739;
  }
`

const ImageWrapper = styled("div")`
  display: flex;
  flex: none;
  align-items: center;

  padding: 0 15px 0 13px;
  margin-top: 1px;

  img {
    position: relative;
    height: 49px;
    width: 49px;
    border-radius: 50%;
    background-color: #131c21;
  }
`

const DetailsWrapper = styled("div")`
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  min-width: 0;
  padding-right: 15px;
  border-top: 1px solid #30383d;
`

const NameWrapper = styled("div")`
  display: flex;
  align-items: center;
  line-height: normal;
  text-align: left;
`

const NameSpan = styled("span")`
  display: flex;
  font-size: 16px;
  text-align: left;
  font-weight: 400;
  line-height: 21px;
  flex-grow: 1;
  color: #f1f1f2eb;
`

const DateWrapper = styled("div")`
  flex: none;
  max-width: 100%;
  margin-top: 3px;
  margin-left: 6px;

  font-size: 12px;
  line-height: 14px;
  text-overflow: ellipsis;

  color: #f1f1f2a1;
`

const MessageWrapper = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 2px;

  min-height: 20px;
  font-size: 14px;
  line-height: 20px;

  color: #f1f1f2eb;
`

const MessageInnerWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-grow: 1;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  width: 100px;
  overflow: hidden;

  svg {
    display: inline-block;
    vertical-align: bottom;
  }
`
const MessageSpan = styled("span")`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #f1f1f2a1;
`





const mapDispatchToProps = { setSelectedContact, closeContactsNavigation, selectConversation };

const connector = connect(null, mapDispatchToProps)

export type ConnectorProps = ConnectedProps<typeof connector>

export default connector(Contact)
