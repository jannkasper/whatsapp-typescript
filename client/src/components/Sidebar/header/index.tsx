import { connect, ConnectedProps } from "react-redux";
import Header from "./header";
import { ApplicationState } from "../../../reducers";
import { openContactsNavigation } from "../../../actions";

const mapStateToProps = (state: ApplicationState) => ({
    profileImage: state.user?.profileImage
})
const mapDispatchToProps = {
    openContactsNavigation
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type HeaderProps = ConnectedProps<typeof connector>

export default connector(Header)
