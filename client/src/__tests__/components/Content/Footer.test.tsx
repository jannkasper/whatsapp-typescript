import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../store';
import Footer  from '../../../components/Content/footer/index';
import * as actions from '../../../actions';
import {createBrowserHistory} from "history";

const store = configureStore(createBrowserHistory(), window.INITIAL_REDUX_STATE);

jest.mock('../../../actions');

describe('Footer component', () => {
    it('should display', () => {
        const {asFragment} = render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    })

    it('can send message', async () => {
        const sendMessage = jest.fn((type, value) => ({ type: type, value: value }));
        // @ts-ignore
        jest.spyOn(actions, "createMessage").mockImplementation(sendMessage);

        render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );

        const input = screen.getByRole('inputText');

        // Validate
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() =>  {
            expect(sendMessage).not.toHaveBeenCalled();
        });

        // Type test
        fireEvent.change(input, { target: { value: 'TEST' } })

        // Validate
        fireEvent.keyDown(input, {key: 'Enter'});

        await waitFor(() =>  {
            expect(sendMessage).toHaveBeenLastCalledWith({ type: 'text', value: 'TEST' });
        });
    });

    it('can send file', async () => {
        const sendMessage = jest.fn((type, value) => ({ type: type, value: value }));
        // @ts-ignore
        jest.spyOn(actions, "createMessage").mockImplementation(sendMessage);

        render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );

        const inputFile = screen.getByRole('inputFile', { hidden: true });

        const event = {
            target: {
                files: [{type: 'image/jpeg'}],
            },
        }

        // Validate
        fireEvent.change(inputFile, event);

        await waitFor(() =>  {
            expect(sendMessage).toHaveBeenLastCalledWith({ type: 'image', value: {type: 'image/jpeg'} });
        });
    });
});
