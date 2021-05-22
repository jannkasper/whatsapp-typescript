import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import SignupForm  from '../../components/SignupForm';
import * as actions from '../../actions';
import * as fetchContacts from '../../store/fetchContacts';
import * as fetchConversations from '../../store/fetchConversations';
import * as fetcher from "../../util/fetcher";
import {createBrowserHistory} from "history";

const store = configureStore(createBrowserHistory(), window.INITIAL_REDUX_STATE);

jest.mock('../../actions');
jest.mock('../../store/fetchContacts');
jest.mock('../../store/fetchConversations');


describe('SignupForm component', () => {
    it('should display', () => {
        const {asFragment} = render(
            <Provider store={store}>
                <SignupForm handleChangeMode={new Function()} />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    })

    it('can change mode', () => {
        const handleChangeModeMock = jest.fn();
        render(
            <Provider store={store}>
                <SignupForm handleChangeMode={handleChangeModeMock} />
            </Provider>,
        );

        const button = screen.getByText('Log in');

        fireEvent.click(button)

        expect(handleChangeModeMock).toHaveBeenCalled();
    });

    it('can sign up', async () => {

        const data = { userInfo: { externalIdentifier: '1' } };
        Object.defineProperty(fetcher, 'publicFetch', {
            writable: true,
            value: { post: jest.fn(() => Promise.resolve({data})) }
        });

        const receiveAuthenticationMock = jest.fn(data => ({type: '', result: data}));
        const fetchContactsMock = jest.fn(() => ({type: ''}));
        const fetchConversationsMock= jest.fn(userExtId => ({type: '', result: userExtId}));

        // @ts-ignore
        jest.spyOn(actions, "receiveAuthentication").mockImplementation(receiveAuthenticationMock)
        // @ts-ignore
        jest.spyOn(fetchContacts, "default").mockImplementation(fetchContactsMock);
        // @ts-ignore
        jest.spyOn(fetchConversations, "default").mockImplementation(fetchConversationsMock)

        render(
            <Provider store={store}>
                <SignupForm handleChangeMode={new Function()} />
            </Provider>,
        );

        const phoneNumberInput = screen.getByPlaceholderText('Phone number');
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const button = screen.getByText('Sign up');

        fireEvent.change(phoneNumberInput, { target: { value: '555666777' } })
        fireEvent.change(usernameInput, { target: { value: 'usernameTest' } })
        fireEvent.change(passwordInput, { target: { value: 'passwordTest' } })
        fireEvent.click(button)

        await waitFor(() =>  {
            expect(fetcher.publicFetch.post).toHaveBeenCalledTimes(1);
            expect(fetchContactsMock).toHaveBeenLastCalledWith('');
            expect(fetchConversationsMock).toHaveBeenLastCalledWith(data.userInfo.externalIdentifier);

        });
    })
});
