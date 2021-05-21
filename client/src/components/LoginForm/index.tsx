import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {ApplicationState} from "../../reducers";
import LoginForm from "./LoginForm";
import { receiveAuthentication } from "../../actions";
import fetchContacts from "../../store/fetchContacts";
import fetchConversations from "../../store/fetchConversations";

const mapStateToProps = (state: ApplicationState) => ({
    state
})

const mapDispatchToProps = {
    receiveAuthentication,
    fetchContacts,
    fetchConversations
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type LoginFormProps = ConnectedProps<typeof connector> & { handleChangeMode: Function }

export default connector(LoginForm)
