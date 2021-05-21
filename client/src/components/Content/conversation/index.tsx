import React from "react";
import {ApplicationState} from "../../../reducers";
import {connect, ConnectedProps} from "react-redux";
import Conversation from "./conversation";

const mapStateToProps = (state: ApplicationState) => ({
    currentConversation: state.conversations.selectedConversation,
})

const mapDispatchToProps = {
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ConversationProps = ConnectedProps<typeof connector>

export default connector(Conversation)
