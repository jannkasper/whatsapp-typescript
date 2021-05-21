import React, { useState } from "react";
import styled from "@emotion/styled";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

const Popup: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleChangeMode = (event: React.ChangeEvent) => {
        event.preventDefault();
        setIsLogin(!isLogin);
    }
    return (
        <PopupWrapper>
            { isLogin ?
                <LoginForm handleChangeMode={handleChangeMode} /> :
                <SignupForm handleChangeMode={handleChangeMode} />
            }
        </PopupWrapper>
    )
}

const PopupWrapper = styled("div")`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`

export default Popup
