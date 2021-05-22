import * as actions from "../../actions/contacts";
import { Dispatch } from "redux";

describe('Contacts actions', () => {
    it('should create all actions', () => {
        const mockDispatch = jest.fn();

        const actionsResults: Array<[((dispatch: Dispatch) => Promise<void>), string, any?]> = [
            [actions.fetchContactsSuccess({ contacts: [] as Contact[] }), 'FETCH_CONTACTS_SUCCESS', { contacts: [] as Contact[] }],
            [actions.fetchContactsError({}), 'FETCH_CONTACTS_ERROR', {}],
            [actions.receiveNewContact({ contact: {} as Contact }), 'RECEIVE_CONTACT', { contact: {} as Contact }],
        ];

        expect(actions.fetchContactsPending()).toEqual({ type: "FETCH_CONTACTS_PENDING" })
        actionsResults.forEach(([action,type, payload]) => {
            action(mockDispatch);
            expect(mockDispatch).toHaveBeenLastCalledWith({
                type,
                payload,
            })
        });
    })
})
