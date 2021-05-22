import * as actions from "../../actions/app";
import { Dispatch } from "redux";

describe('App actions', () => {
    it('should create all actions', () => {
        const mockDispatch = jest.fn();

        const actionsResults: Array<[((dispatch: Dispatch) => Promise<void>), string, any?]> = [
            [actions.receiveAuthentication({} as UserAuthentication), 'USER_AUTHENTICATION', {} as UserAuthentication],
            [actions.openContactsNavigation(), 'OPEN_CONTACTS_NAVIGATION'],
            [actions.closeContactsNavigation(), 'CLOSE_CONTACTS_NAVIGATION'],
            [actions.setSelectedContact({contactExtId: 'test'}), 'SET_SELECTED_CONTACT', {contactExtId: 'test'}]
        ];

        actionsResults.forEach(([action, type, payload]) => {
            action(mockDispatch)
            expect(mockDispatch).toHaveBeenLastCalledWith({
                payload,
                type
            })
        })
    })
})
