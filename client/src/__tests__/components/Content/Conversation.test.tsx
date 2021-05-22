import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../store';
import Conversation from '../../../components/Content/conversation';
import {createBrowserHistory} from "history";
import {ApplicationState} from "../../../reducers";

const initState = {
    conversations: {
        selectedConversation: undefined
    }
} as ApplicationState;
const store = configureStore(createBrowserHistory(), initState);


describe('Conversation component', () => {

    it('should display', () => {
        const {asFragment} = render(
            <Provider store={store}>
                <Conversation />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    })
});
