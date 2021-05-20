import React from "react";
import styled from "@emotion/styled";
import { HeaderProps } from "./index";
import { Chat, Menu, Status } from "../../icons";
import defaultAvatar from "../../../img/avatar.svg"


const Header: React.FC<HeaderProps> = ({ profileImage, openContactsNavigation }) => {
    let baseImage = defaultAvatar;
    if (profileImage) {
        baseImage = `data:${profileImage.type};base64,${profileImage.data}`
    }

    return (
        <HeaderWrapper>
            <UserImage>
                <img src={baseImage} alt="profileImage"/>
            </UserImage>
            <IconGroup>
                <IconWrapper>
                    <Status />
                </IconWrapper>
                <IconWrapper onClick={() => openContactsNavigation()}>
                    <Chat />
                </IconWrapper>
                <IconWrapper>
                    <Menu />
                </IconWrapper>
            </IconGroup>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled("div")`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 59px;
  padding: 10px 16px;
  background-color: #2a2f32;
`

const UserImage = styled("div")`
  position: relative;
  flex-grow: 1;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;

    transition: opacity .15s ease-out;
  }
`

const IconGroup = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: #b1b3b5;
`

const IconWrapper = styled("div")`
  position: relative;
  margin-left: 10px;
  padding: 8px;
  border-radius: 50%;
  height: 24px;
  cursor: pointer;

  transition: background-color .3s ease;
`

export default Header
