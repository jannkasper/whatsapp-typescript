import {combineReducers, AnyAction} from "redux";
import app from "./app";
import contacts from "./contacts";
import conversations from "./conversations";
import user from "./user";

const appReducer = combineReducers({ app, contacts, conversations, user });

const rootReducer = (state: any, action: AnyAction) => appReducer(state, action);

export default rootReducer
