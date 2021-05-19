import React, {FC} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Home from "../Home";
import Sidebar from "../Sidebar/Sidebar";
import { AppProps } from "./index";

const App: React.FC<AppProps> = ({ showPopup, hasSelectedConversation, userExtId, receiveMessage, receiveNewContact, isLoading, completed }) => {
    return (
        <AppWrapper>
            <InnerWrapper>
                <Sidebar/>
                <Home/>
            </InnerWrapper>
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
      height: calc(100% - 38px);
  }
`

// const blurStyle = css`
//   filter: blur(4px);
// `
//
// const zoomOutStyle = css`
//   animation: zoomInOutPage 200ms ease-in;
//
//   @keyframes zoomInOutPage {
//     0% { opacity: 0; transform:scale(1.5)}
//     100% { opacity: 1; transform:scale(1)}
//   }
// `
//
// interface ComponentProps {
//     className?: string,
//     showPopup?: boolean,
//     children?: any
// }
//
// const Component: FC<ComponentProps> = ({
//    showPopup,
//    className,
//     children
// }) => <div css={{background: 'black'}} className={className} >{children}</div>

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

