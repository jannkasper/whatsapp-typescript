import { connect, ConnectedProps } from "react-redux";
import App from "./App";
import { ApplicationState } from "../../reducers";
import { receiveMessage, receiveNewContact } from "../../actions";
import fetchContacts from "../../store/fetchContacts";
import fetchConversations from "../../store/fetchConversations";

const mapStateToProps = (state: ApplicationState) => ({
    showPopup: !Boolean(state.user.externalIdentifier),
    userExtId: 'Q1u4T6sZ2' || state.user.externalIdentifier,
    hasSelectedConversation: Boolean(state.conversations.selectedConversation),
    isLoading: state.contacts.pending || state.conversations.pending,
    completed: Number(state.contacts.pending) + Number(state.conversations.pending) / 2 * 100
})
const mapDispatchToProps = {
    receiveMessage,
    receiveNewContact,

    //temporary
    fetchContacts,
    fetchConversations
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type AppProps = ConnectedProps<typeof connector>

export default connector(App)
