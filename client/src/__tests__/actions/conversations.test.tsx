import * as actions from '../../actions/conversations';
import * as message from '../../util/message';
import * as socket from '../../util/socket';
import {Dispatch} from 'redux';
import {Socket} from "socket.io-client";

describe('Conversations actions', () => {
    it ('should create all actions', () => {
        const mockDispatch = jest.fn();

        const actionsResults: Array<[((dispatch: Dispatch) => Promise<void>), string, any?]> = [
            [actions.fetchConversationsSuccess({}), 'FETCH_CONVERSATIONS_SUCCESS', {}],
            [actions.fetchConversationsError({}), 'FETCH_CONVERSATIONS_ERROR', {}],
            [actions.selectConversation({ contactExtId: 'test' }), 'SELECT_CONVERSATION', { contactExtId: 'test' }],
            [actions.receiveMessage({ message: {} as Message }), 'RECEIVE_MESSAGE', { message: {} as Message }],

        ];

        expect(actions.fetchConversationsPending()).toEqual({ type: 'FETCH_CONVERSATIONS_PENDING' })
        actionsResults.forEach(([action, type, payload]) => {
            action(mockDispatch);
            expect(mockDispatch).toHaveBeenLastCalledWith({
                type,
                payload
            });
        });
    });

    it('should create an action to create message', async () => {
        const mockDispatch = jest.fn();
        const mockEmit = jest.fn();
        jest.spyOn(socket, 'getSocket').mockImplementation( () => ({ emit: mockEmit } as Socket & { emit: jest.Mock}));
        jest.spyOn(message, 'prepare').mockResolvedValue(({toSend: { value: 'toSendTest' }, original: {value: 'originalTest'} as Message} as SendMessage));

        await actions.createMessage({ type: 'text', value: 'test' })(mockDispatch, jest.fn().mockReturnValue({ state: {} }));

        expect(message.prepare).toHaveBeenLastCalledWith({ type: 'text', value: 'test' }, { state: {} });
        expect(mockDispatch).toHaveBeenLastCalledWith({ type: 'CREATE_MESSAGE', payload: { message: {value: 'originalTest'} } });
        expect(socket.getSocket().emit).toHaveBeenLastCalledWith('MESSAGE', { value: 'toSendTest' });
    })
})
