import React, { useState } from "react";
import styled from "@emotion/styled";
import {FooterProps} from "./index";
import {Clip, Ptt, Smiley} from "../../icons";

const Footer: React.FC<FooterProps> = ({ createMessage }) => {
    const [value, setValue] = useState("");

    async function handleSendFile(event: React.ChangeEvent<HTMLInputElement>) {
        createMessage({ type: "image", value: (event.target.files as FileList)[0] });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    async function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter' && value) {
            try {
                await createMessage({ type: "text", value: value })
            } catch(e) { console.log(e) }
            setValue("");
        }
    }

    return (
        <FooterWrapper>
            <IconGroup>
                <IconWrapper>
                    <Smiley />
                </IconWrapper>
                <input
                    role="inputFile"
                    id="file"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={event => handleSendFile(event)}
                    style={{display: "none"}}
                />
                <IconWrapper htmlFor="file">
                    <Clip />
                </IconWrapper>
            </IconGroup>

            <TextInput
                role="inputText"
                value={value}
                onChange={event => handleChange(event)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
            />
            <IconGroup>
                <IconWrapper>
                    <Ptt />
                </IconWrapper>
            </IconGroup>

        </FooterWrapper>
    )
}

const FooterWrapper = styled("div")`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 59px;
  padding: 10px 16px;
  background-color: #1e2428;
  bottom: 0;
`

const IconGroup = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #828689;
`

const IconWrapper = styled("label")`
  position: relative;
  padding: 8px;
  border-radius: 50%;
  height: 24px;
  margin: 4px;

  transition: background-color .3s ease;

  &:hover, &:active {
    background-color: #252d32;
  }
`

const TextInput = styled("input")`
  display: flex;
  flex-grow: 1;
  align-items: center;
  top: 7px;
  height: 38px;
  padding-left: 15px;
  border: none;
  border-radius: 18px;
  box-sizing: border-box;
  font-size: 15px;

  background-color: #323739;
  color: #f1f1f2;
  &:focus {
    outline: none;
  }
`




export default Footer
