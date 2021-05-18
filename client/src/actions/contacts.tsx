import {Dispatch} from "redux";

export const fetchContactsPending = () => ({ type: "FETCH_CONTACTS_PENDING" });

export const fetchContactsSuccess = (payload: { contacts: Contact[] }) => async (dispatch: Dispatch) => {
    dispatch({ type: "FETCH_CONTACTS_SUCCESS", payload });
};

export const fetchContactsError = (payload: any) => async (dispatch: Dispatch) => {
    dispatch({ type: "FETCH_CONTACTS_ERROR", payload });
};

export const receiveNewContact = (payload: { contact: Contact }) => async (dispatch: Dispatch) => {
    dispatch({ type: "RECEIVE_CONTACT", payload });
};
