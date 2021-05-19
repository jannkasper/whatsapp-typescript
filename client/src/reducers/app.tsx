import { AnyAction, Reducer } from "redux";

const initialState: AppState = {
    openContactsNavigation: false
}

const reducer: Reducer<AppState> = (state: AppState = initialState, action: AnyAction) => {
    switch (action.type) {
        case "OPEN_CONTACTS_NAVIGATION":
            return {
                ...state,
                openContactsNavigation: true
            }
        case "CLOSE_CONTACTS_NAVIGATION":
            return {
                ...state,
                openContactsNavigation: false
            }
        default:
            return state;
    }
}

export { reducer as AppReducer }
