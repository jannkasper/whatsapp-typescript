import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Home from "../Home";
import Sidebar from "../Sidebar";
import { AppProps } from "./index";
import Content from "../Content";

const App: React.FC<AppProps> = ({
    showPopup,
    hasSelectedConversation,
    userExtId, receiveMessage,
    receiveNewContact,
    isLoading,
    completed,
    fetchContacts,
    fetchConversations
}) => {
    useEffect(() => {
        fetchContacts(userExtId);
        fetchConversations(userExtId);
    }, [userExtId]);

    return (
        <AppWrapper isBlur={showPopup} zoomOut={!showPopup}>
            <InnerWrapper>
                <Sidebar/>
                { hasSelectedConversation ? <Content/> : <Home /> }
            </InnerWrapper>
        </AppWrapper>
    );
}

type AppWrapperProps = {
    isBlur: boolean
    zoomOut: boolean
}
const AppWrapper = styled("div")<AppWrapperProps>`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  filter: ${props => props.isBlur ? 'blur(4px)' : 'unset'};
  ${props => props.zoomOut && `
    animation: zoomInOutPage 200ms ease-in;
    
    @keyframes zoomInOutPage {
    0% { opacity: 0; transform:scale(1.5)}
    100% { opacity: 1; transform:scale(1)}
    }
  `};

  @media (min-width: 1440px) {  
    top: 19px;
    width: 1400px;
    height: calc(100vh - 38px);  
  }
`

const InnerWrapper = styled("div")`
  position: relative;
  top: 0;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /*right: -50px;*/
  /*top: 50px;*/
`

export default App

