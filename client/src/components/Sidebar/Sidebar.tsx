import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "./header";
import Notification from "./notification";
import SearchInput from "./search";
import ContactGroup from "./contactGroup";
import ContactsNavigation from "../ContactsNavigation";
import { SidebarProps } from "./index";

const Sidebar: React.FC<SidebarProps> = ({ selectedContact, contactArray }) => {
    const [searchText, setSearchText] = useState("");

    return (
        <SidebarWrapper>
            <ContactsNavigation />
            <Header />
            <Notification />
            <SearchInput
                placeHolder={"Search or start new chat"}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <ContactGroup
                chats={contactArray.filter(contact => contact.username.toLowerCase().includes(searchText.toLowerCase()))}
                selectedContact={selectedContact}
                isSidebar={true}
            />
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 40%;
  background-color: #131c21;
  border-right: 1px solid #30383d;

  @media (min-width: 900px) {
    flex: 35%;
  }

  @media (min-width: 1300px) {
    flex: 30%;
  }
`

export default Sidebar
