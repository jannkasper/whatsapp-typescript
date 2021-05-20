import React from "react";
import styled from "@emotion/styled";
import { HeaderProps } from "./index";
import { Back } from "../../icons";

const Header: React.FC<HeaderProps> = ({ closeContactsNavigation }) => {

    return (
        <HeaderWrapper>
            <HeaderInner>
                <IconWrapper onClick={() => closeContactsNavigation()}>
                    <Back />
                </IconWrapper>
                <Title>New Chat</Title>
            </HeaderInner>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled("div")`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  height: 108px;

  padding: 0 20px 10px 10px;
  background-color: #2a2f32;
  color: #e1e1e3;
`

const HeaderInner = styled("div")`
  display: flex;
  align-items: center;
`

const IconWrapper = styled("div")`
  position: relative;
  margin-left: 10px;
  padding: 8px;
  border-radius: 50%;
  height: 24px;
  width: 53px;
  cursor: pointer;

  transition: background-color .3s ease;
`

const Title = styled("div")`
  font-size: 19px;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default Header
