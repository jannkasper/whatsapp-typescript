import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {ApplicationState} from "../../reducers";
import SignupForm from "./SignupForm";
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

export type SignupFormProps = ConnectedProps<typeof connector> & { handleChangeMode: Function }

export default connector(SignupForm)
