import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../store';
import Notification from '../../../components/Sidebar/notification';
import {createBrowserHistory} from "history";

const store = configureStore(createBrowserHistory(), window.INITIAL_REDUX_STATE);

describe('Notification component', () => {

    it('should display', () => {
        const {asFragment} = render(
            <Provider store={store}>
                <Notification />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
        expect(screen.getByText('Get notified of new messages')).toBeDefined();
    })
});
