import React from "react";
import styled from "@emotion/styled";
import { HeaderProps } from "./index";
import defaultAvatar from "../../../img/avatar.svg";
import {Menu, Search} from "../../icons";

const Header: React.FC<HeaderProps> = ({ currentContact }) => {
    let baseImage = defaultAvatar;
    if (currentContact.profileImage) {
        baseImage = `data:${currentContact.profileImage.type};base64,${currentContact.profileImage.data}`
    }

    return (
        <HeaderWrapper>
            <ImageWrapper>
                <img src={baseImage} alt="profileImage"/>
            </ImageWrapper>
            <NameWrapper>
                <NameSpan>{currentContact.username}</NameSpan>
            </NameWrapper>
            <IconGroup>
                <IconWrapper>
                   <Search />
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

const ImageWrapper = styled("div")`
  position: relative;
  padding: 0 15px 0 0;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;

    transition: opacity .15s ease-out;
  }
`

const NameWrapper = styled("div")`
  flex-grow: 1;
  color: #f1f1f2eb;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NameSpan = styled("span")`
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
  transition: background-color .3s ease;
`

export default Header
