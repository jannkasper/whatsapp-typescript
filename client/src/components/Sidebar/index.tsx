import { connect, ConnectedProps } from "react-redux";
import Sidebar from "./Sidebar";
import { ApplicationState } from "../../reducers";

function sortByDate (a: any, b: any): number {
    if (a.message === undefined) {
        return -1;
    } else if (b.message === undefined) {
        return 1;
    } else {
        return b.message.created - a.message.created;
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    selectedContact: state.contacts.selectedContact,
    contactArray: state.conversations.conversationArray
        .filter(element => element.conversation && element.conversation.length > 0)
        .map(element => {
            return {
                ...state.contacts.contactArray.find(contact => contact.externalIdentifier === element.contactExtId) as Contact,
                message: element.conversation.slice(-1)[0]
            }
        }).sort(sortByDate),
})
const mapDispatchToProps = {
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type SidebarProps = ConnectedProps<typeof connector>

export default connector(Sidebar)
