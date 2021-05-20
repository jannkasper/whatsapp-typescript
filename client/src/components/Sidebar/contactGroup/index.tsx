import React from "react";
import styled from "@emotion/styled";
import Contact from "../contact";

interface ContactGroupProps {
    chats:(Contact & {message?: Message})[],
    selectedContact?: Contact & {message: Message},
    isSidebar?: boolean
}

const ContactGroup: React.FC<ContactGroupProps> = ({ chats, selectedContact, isSidebar  }) => {
    return (
        <ContactGroupWrapper>
            <ResizeWrapper>
                {chats.map(contact =>
                    <Contact
                        externalIdentifier={contact.externalIdentifier}
                        name={contact.username}
                        profileImage={contact.profileImage}
                        status={contact.status}
                        lastMessage={contact.message}
                        isSelected={selectedContact?.externalIdentifier === contact.externalIdentifier }
                    />)}
            </ResizeWrapper>
        </ContactGroupWrapper>
    )
}

const ContactGroupWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;

  background-color: #131c21;
  height: 100%;
  overflow: hidden;
`
const ResizeWrapper = styled("div")`
  display: block;
  overflow:hidden;
  overflow-y:scroll;
`

export default ContactGroup
