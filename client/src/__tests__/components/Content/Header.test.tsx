import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../store';
import Header from '../../../components/Content/header/index';
import {createBrowserHistory} from "history";
import {ApplicationState} from "../../../reducers";

const initState = {
    contacts: {
        selectedContact: {
            username: 'tester'
        }
    }
} as ApplicationState;
const store = configureStore(createBrowserHistory(), initState);

describe('Header component', () => {

    it('should display', () => {
        const {asFragment} = render(
            <Provider store={store}>
                <Header/>
            </Provider>,
        );

        expect(screen.getByText((initState.contacts.selectedContact as Contact).username)).toBeDefined();
        expect(asFragment()).toMatchSnapshot();
    })
});
