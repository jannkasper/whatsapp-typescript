import React from "react";
import {ApplicationState} from "../../../reducers";
import {connect, ConnectedProps} from "react-redux";
import Footer from "./footer";
import { createMessage } from "../../../actions";

const mapStateToProps = (state: ApplicationState) => ({
})

const mapDispatchToProps = {
    createMessage
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type FooterProps = ConnectedProps<typeof connector>

export default connector(Footer)
