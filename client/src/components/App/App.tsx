import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Home from "../Home";
import Sidebar from "../Sidebar";
import { AppProps } from "./index";
import Content from "../Content";
import Popup from "../Popup";
import ProgressBar from "../ProgressBar";

const App: React.FC<AppProps> = ({
    showPopup,
    hasSelectedConversation,
    userExtId,
    receiveMessage,
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
        <AppWrapper>
            {isLoading ?
                <ProgressBar completed={completed}/> :
                <>
                    <PanelWrapper isBlur={showPopup} zoomOut={!showPopup}>
                        <Sidebar/>
                        {hasSelectedConversation ? <Content/> : <Home/>}
                    </PanelWrapper>
                    {showPopup && <Popup/>}
                </>
            }
        </AppWrapper>
    );
}

const AppWrapper = styled("div")`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media (min-width: 1440px) {  
    top: 19px;
    width: 1400px;
    height: calc(100vh - 38px);  
  }
`
type PanelProps = {
    isBlur: boolean
    zoomOut: boolean
}

const PanelWrapper = styled("div")<PanelProps>`
  position: relative;
  top: 0;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /*right: -50px;*/
  /*top: 50px;*/
  filter: ${props => props.isBlur ? 'blur(4px)' : 'unset'};
  ${props => props.zoomOut && `
    animation: zoomInOutPage 200ms ease-in;
    
    @keyframes zoomInOutPage {
    0% { opacity: 0; transform:scale(1.5)}
    100% { opacity: 1; transform:scale(1)}
    }
  `};
`

export default App

