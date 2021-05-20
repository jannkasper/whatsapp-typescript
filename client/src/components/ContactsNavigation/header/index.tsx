import {connect, ConnectedProps} from "react-redux";
import Header from "./header";
import { closeContactsNavigation } from "../../../actions";
import { ApplicationState } from "../../../reducers";

const mapStateToProps = (state: ApplicationState) => {
    return { };
};

const mapDispatchToProps = {
    closeContactsNavigation
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type HeaderProps = ConnectedProps<typeof connector>

export default connector(Header)
