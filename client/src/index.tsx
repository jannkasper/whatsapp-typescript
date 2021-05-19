import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history'
import './index.css';
import App from './components/App/App';
import configureStore from "./store";
import {ConnectedRouter} from "connected-react-router";

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createBrowserHistory()

const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(history, initialState)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);
