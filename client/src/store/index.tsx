import {createStore, Store, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { ApplicationState } from "../reducers";
import { createRootReducer } from "../reducers";
import { History } from 'history'

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const enabledMiddlewares = [thunk];

    const middlewares = applyMiddleware(...enabledMiddlewares);

    // We'll create our store with the combined reducers, and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore(
        createRootReducer(history),
        initialState,
        compose(middlewares)
    )

    return store
}
