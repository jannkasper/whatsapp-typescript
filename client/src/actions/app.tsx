import {Dispatch} from "redux";

export const receiveAuthentication = (payload: UserAuthentication) => async (dispatch: Dispatch) => {
    dispatch({ type: "USER_AUTHENTICATION", payload });
};

export const openContactsNavigation = () => async (dispatch: Dispatch) => {
    dispatch({ type: "OPEN_CONTACTS_NAVIGATION" });
};

export const closeContactsNavigation = () => async (dispatch: Dispatch) => {
    dispatch({ type: "CLOSE_CONTACTS_NAVIGATION" });
};

export const setSelectedContact = (payload: { contactExtId: string }) => async (dispatch: Dispatch) => {
    dispatch({ type: "SET_SELECTED_CONTACT", payload });
};
