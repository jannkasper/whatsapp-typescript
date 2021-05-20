import {connect, ConnectedProps} from "react-redux";
import ContactsNavigation from "./ContactsNavigation";
import { receiveAuthentication } from "../../actions";
import { ApplicationState } from "../../reducers";

const mapStateToProps = (state: ApplicationState) => {
    return {
        openContactsNavigation: state.app.openContactsNavigation,
        contactArray: state.contacts.contactArray,
    };
};

const mapDispatchToProps = {
    receiveAuthentication
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContactsNavigationProps = ConnectedProps<typeof connector>

export default connector(ContactsNavigation)
