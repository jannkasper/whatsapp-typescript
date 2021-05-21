import React, {ChangeEventHandler, FocusEventHandler} from "react";
import styled from "@emotion/styled";
import Alert from "../icons/Alert";

interface InputForm {
    label: string
    type: string
    name: string
    autoComplete: string
    placeholder: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    onBlur: FocusEventHandler<HTMLInputElement>
    hasError: boolean
    errorMessage: string | undefined
}

const InputForm: React.FC<InputForm> = ({
    label,
    type,
    name,
    autoComplete,
    placeholder,
    value,
    onChange,
    onBlur,
    hasError = false,
    errorMessage
}) => {
    return (
        <InputFormWrapper>
            <InnerWrapper>
                <InputText
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    onBlur={onBlur}
                    hasError={hasError}
                />
                { hasError && <Alert /> }
            </InnerWrapper>
            { hasError && <ErrorMessage>{errorMessage}</ErrorMessage> }
        </InputFormWrapper>
    )
}

const InputFormWrapper = styled("div")`
  width: 70%;
`

const InnerWrapper = styled("div")`
  position: relative;
  margin-bottom: 15px;
  //margin: 2px 0;
`

type InputTextProps = {
    hasError: boolean
}
const InputText = styled("input")<InputTextProps>`
  height: 38px;
  width: 100%;
  padding-left: 15px;
  border: none;
  //border-radius: 10px;
  box-sizing: border-box;
  font-size: 15px;
  border-bottom: 2px solid;
  border-bottom-color: ${props => props.hasError ? '#de535e' : '#00af9c'};
  background-color: transparent;
  color: #f1f1f2;
  &:focus {
    outline: none;
  }
`

const ErrorMessage = styled("p")`
  position: absolute;
  margin: -15px 0;
  color: #D1383D;
  padding: 2px;
  font-size: 12px;
`

export default InputForm

