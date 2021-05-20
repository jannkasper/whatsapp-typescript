import { AnyAction, Reducer } from "redux";

const initialState: ContactsState = {
    pending: false,
    error: null,
    selectedContact: undefined,
    contactArray: []
}

// export interface ContactsAction extends AnyAction {
//     payload?: any
// }

const reducer: Reducer<ContactsState> = (state: ContactsState = initialState, action: AnyAction) => {
    switch (action.type) {
        case "SET_SELECTED_CONTACT":
            return {
                ...state,
                selectedContact: state.contactArray.find(element => element.externalIdentifier === action.payload.contactExtId) as Contact
            }
        case "FETCH_CONTACTS_PENDING":
            return {
                ...state,
                pending: true,
            }
        case "FETCH_CONTACTS_SUCCESS":
            return {
                ...state,
                pending: false,
                contactArray: action.payload.contacts,
            }
        case "FETCH_CONTACTS_ERROR":
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            }
        case "RECEIVE_CONTACT":
            return  {
                ...state,
                contactArray: [...state.contactArray, action.payload.contact]
            }
        default:
            return state;
    }
}

export { reducer as ContactsReducer}
