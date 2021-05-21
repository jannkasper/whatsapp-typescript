import React, {useState} from "react";
import styled from "@emotion/styled";
import {Formik} from "formik";
import * as Yup from "yup";
import { SignupFormProps } from "./index";
import InputForm from "../InputForm";
import { publicFetch } from "../../util/fetcher";

import profileImage from "../../img/avatar.svg";


const SignupForm: React.FC<SignupFormProps> = ({ handleChangeMode, receiveAuthentication, fetchContacts, fetchConversations }) => {
    const [userImage, setUserImage] = useState(profileImage);

    return (
        <Formik
            initialValues={{ file: new Blob(), phoneNumber: "", username: "", password: "" }}
            onSubmit={async (values, { setFieldError, setStatus, resetForm}) => {
                try {
                    let formData = new FormData();
                    formData.append('profileImage', values.file);
                    formData.append('phoneNumber', values.phoneNumber);
                    formData.append('username', values.username);
                    formData.append('password', values.password);

                    const { data } = await publicFetch.post("signup", formData);
                    if (data.hasError) {
                        setFieldError(data.field, data.message);
                        return;
                    }
                    receiveAuthentication(data);
                    fetchContacts('');
                    fetchConversations(data.userInfo.externalIdentifier)
                    resetForm({})
                    setUserImage(profileImage);

                } catch (error) {
                    setStatus(error.response.data.message)
                    console.log(error)
                }
            }}
            validationSchema={Yup.object({
                phoneNumber: Yup.string()
                    .required("Required")
                    .length(9, "Must be 9 characters long")
                    .matches(/^[0-9]+$/, "Contains invalid characters"),
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
                     values, errors, touched, status, setFieldValue,
                     handleChange, handleBlur, handleSubmit, isSubmitting
                 }) => (
                    <FormWrapper onSubmit={handleSubmit}>
                        <label htmlFor="image">
                            <input
                                id="image"
                                type="file"
                                name="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={(event) => {
                                    setFieldValue("file", (event.currentTarget.files as FileList)[0]);
                                    setUserImage(URL.createObjectURL((event.currentTarget.files as FileList)[0]))
                                }}
                                onBlur={handleBlur}
                                style={{display: "none"}}
                            />
                            <HoverStyle>Edit</HoverStyle>
                            <Image src={userImage} alt="profileImage"/>
                        </label>
                        <InputForm
                            label="PhoneNumber"
                            type="text"
                            name="phoneNumber"
                            autoComplete="off"
                            placeholder="Phone number"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            hasError={Boolean(touched.phoneNumber && errors.phoneNumber)}
                            errorMessage={errors.phoneNumber && errors.phoneNumber}
                        />
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
                        <Button type="submit">Sign up</Button>
                        <LineStyle />
                        <Text>
                            Have an account? <Anchor href="!#" onClick={(e) => handleChangeMode(e)}>Log in</Anchor>
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

const HoverStyle = styled("div")`
  position: absolute;
  height: 100px;
  line-height: 100px;
  width: 100px;
  text-align: center;
  border-radius: 50%;
  color: grey;
  background-color: #000000;
  opacity: .0;

  &:hover {
    opacity: 0.4;
  }
`

const Image = styled("img")`
  margin-bottom: 20px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
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


export default SignupForm
