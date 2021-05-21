import React from "react";
import styled from "@emotion/styled";
import {Formik} from "formik";
import * as Yup from "yup";
import { LoginFormProps } from "./index";
import InputForm from "../InputForm";
import { publicFetch } from "../../util/fetcher";

import logo from "../../img/logo.svg";

const LoginForm: React.FC<LoginFormProps> = ({ handleChangeMode, receiveAuthentication, fetchContacts, fetchConversations }) => {
    return (
        <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={async (values, {setFieldError, setStatus, resetForm}) => {
                try {
                    const {data} = await publicFetch.post("authenticate", values);
                    if (data.hasError) {
                        setFieldError(data.field, data.message);
                        return;
                    }
                    receiveAuthentication(data);
                    fetchContacts(data.userInfo.externalIdentifier);
                    fetchConversations(data.userInfo.externalIdentifier)
                    resetForm({})

                } catch (error) {
                    setStatus(error.response.data.message)
                    console.log(error)
                }
            }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required("Required")
                    .min(4, "Must be at least 4 characters long")
                    .max(16, "Must be at most 16 characters long")
                    .matches(/^[a-zA-Z0-9_-]+$/, "Contains invalid characters"),
                password: Yup.string()
                    .required("Required")
                    .min(6, "Must be at least 6 characters long")
                    .max(50, "Must be at most 50 characters long"),
            })}
        >
            {
                ({
                     values, errors, touched, status,
                     handleChange, handleBlur, handleSubmit, isSubmitting
                 }) => (
                    <FormWrapper onSubmit={handleSubmit}>
                        <Image src={logo} />
                        <InputForm
                            label="Username"
                            type="text"
                            name="username"
                            autoComplete="off"
                            placeholder="Username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            hasError={Boolean(touched.username && errors.username)}
                            errorMessage={errors.username && errors.username}
                        />
                        <InputForm
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            hasError={Boolean(touched.password && errors.password)}
                            errorMessage={errors.password && errors.password}
                        />
                        <br/>
                        <Button type="submit">Log In</Button>
                        <LineStyle />
                        <Text>
                            Don't have an account? <Anchor href="!#" onClick={(e) => handleChangeMode(e)}>Sing up</Anchor>
                        </Text>
                    </FormWrapper>
                )
            }
        </Formik>
    )
}

const FormWrapper = styled("form")`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //vertical-align: middle;
  width: 300px;
  height: 500px;
  border-radius: 20px;
  background: #323739;
`

const Image = styled("img")`
  width: 35%;
  height: 35%;
`

const Button = styled("button")`
  height: 38px;
  width: 70%;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 15px;

  background-color: #00af9c;
  color: #f1f1f2;
  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #008577;
  }
`

const LineStyle = styled("div")`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  height: 2px;
  background-color: #404040;
`

const Text = styled("div")`
  color: #969696;
`

const Anchor = styled("a")`
  cursor: pointer;
  text-decoration: none;
  color: #00af9c;
  &:hover {
    text-decoration: underline;
  }
`


export default LoginForm
