import { connect, ConnectedProps } from "react-redux";
import App from "./App";
import { ApplicationState } from "../../reducers";
import { receiveMessage, receiveNewContact } from "../../actions";

const mapStateToProps = (state: ApplicationState) => ({
    showPopup: !Boolean(state.user.externalIdentifier),
    userExtId: state.user.externalIdentifier,
    hasSelectedConversation: Boolean(state.conversations.selectedConversation),
    isLoading: state.contacts.pending || state.conversations.pending,
    completed: Number(state.contacts.pending) + Number(state.conversations.pending) / 2 * 100
})
const mapDispatchToProps = {
    receiveMessage,
    receiveNewContact
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type AppProps = ConnectedProps<typeof connector>

export default connector(App)
