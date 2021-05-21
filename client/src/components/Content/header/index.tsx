import React from "react";
import {ApplicationState} from "../../../reducers";
import {connect, ConnectedProps} from "react-redux";
import Header from "./header";

const mapStateToProps = (state: ApplicationState) => ({
    currentContact: state.contacts.selectedContact as Contact
})

const mapDispatchToProps = {
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type HeaderProps = ConnectedProps<typeof connector>

export default connector(Header)
