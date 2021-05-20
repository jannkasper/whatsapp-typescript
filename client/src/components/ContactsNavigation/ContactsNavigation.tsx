import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import { ContactsNavigationProps } from "./index";
import ContactGroup from "../Sidebar/contactGroup";
import Header from "./header";
import Search from "../Sidebar/search";

const ContactsNavigation: React.FC<ContactsNavigationProps> = ({  contactArray, openContactsNavigation  }) => {
    const [visibility, setVisibility] = useState("hidden");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setTimeout(function() {
            setVisibility("");
        }, 1000);
    })
    return (
        <ContactsNavigationWrapper visibility={visibility} open={openContactsNavigation}>
            <Header />
            <Search placeHolder="Search contacts" searchText={searchText} setSearchText={setSearchText} />
            <ContactGroup chats={contactArray.filter(contact => contact.username.toLowerCase().includes(searchText.toLowerCase()))} />
        </ContactsNavigationWrapper>
    )
}

type ContactsNavigationWrapperProps = {
    visibility: string
    open: boolean
}
const ContactsNavigationWrapper = styled("div")<ContactsNavigationWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 300;
  visibility: ${props => props.visibility};
  ${props => props.open === true && `
    animation-name: open;
    animation-duration: .5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes open {
      0% {
        left: -300px;
        width: 0;
      }

      100% {
        width: 100%;
      }
    }
  `}
  ${props => props.open === false && `
    animation-name: close;
    animation-duration: .5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes close {
      0% {
        width: 100%;
      }

      100% {
        left: -300px;
        width: 0%;
      }
    }
  `}
`

export default ContactsNavigation;
