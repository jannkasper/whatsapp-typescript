import React from "react";
import styled from "@emotion/styled";
import Header from "./header";
import Conversation from "./conversation";
import Footer from "./footer";

function Content() {

    return (
        <ContentWrapper>
            <Header />
            <Conversation />
            <Footer />
        </ContentWrapper>
    )
}

const ContentWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 60%;
  background-color: #0d1418;
  //background-color: #262d31;
  
  @media (min-width: 900px) {  
    flex: 65%;
  }

  @media (min-width: 1300px) { 
    flex: 70%;
  }
`

export default Content
