import { AnyAction } from "redux";


const initialState: AppState = {
    openContactsNavigation: false
}

const app = (state = initialState, action: AnyAction) => {
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

export default app
