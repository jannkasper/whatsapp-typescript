import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { AppReducer } from "./app";
import { ContactsReducer } from "./contacts";
import { ConversationsReducer } from "./conversations";
import { UserReducer } from "./user";
import { History } from 'history'

export interface ApplicationState {
    app: AppState,
    contacts: ContactsState,
    conversations: ConversationsState,
    user: UserState,
}

export const createRootReducer = (history: History) => {
    return combineReducers({
        app: AppReducer,
        contacts: ContactsReducer,
        conversations: ConversationsReducer,
        user: UserReducer,
        router: connectRouter(history)
    })
}
