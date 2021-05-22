import { ContactsReducer } from "../../reducers/contacts";
import {AnyAction} from "redux";

describe('Contacts reducer', () => {
    const defaultState = {
        pending: false,
        error: null,
        selectedContact: undefined,
        contactArray: []
    };
    it('should handle initial state', () => {
        expect(ContactsReducer(undefined, {} as AnyAction)).toEqual(defaultState);
    });

    it('should handle SET_SELECTED_CONTACT', () => {
        const payload = { contactExtId: '2' };
        const recentState = {
            ...defaultState,
            contactArray: [
                {externalIdentifier: '1', username: 'test1'},
                {externalIdentifier: '2', username: 'test2'}
            ]
        };
        const resultState = {
            ...defaultState,
            selectedContact: {externalIdentifier: '2', username: 'test2'},
            contactArray: [
                {externalIdentifier: '1', username: 'test1'},
                {externalIdentifier: '2', username: 'test2'}
            ]
        };
        expect(ContactsReducer(recentState as ContactsState, { type:'SET_SELECTED_CONTACT', payload }))
            .toEqual(resultState)
    })

    it('should handle FETCH_CONTACTS_PENDING', () => {
        const resultState = {
            ...defaultState,
            pending: true
        };
        expect(ContactsReducer(undefined, { type:'FETCH_CONTACTS_PENDING' }))
            .toEqual(resultState)
    })

    it('should handle FETCH_CONTACTS_SUCCESS', () => {
        const payload = { contacts: [{externalIdentifier: '1', username: 'test1'}] };
        const resultState = {
            ...defaultState,
            contactArray: payload.contacts
        };
        expect(ContactsReducer(undefined, { type:'FETCH_CONTACTS_SUCCESS', payload }))
            .toEqual(resultState)
    })

    it('should handle FETCH_CONTACTS_ERROR', () => {
        const payload = { error: 'errorTest' };
        const resultState = {
            ...defaultState,
            error: payload.error,
        };
        expect(ContactsReducer(undefined, { type:'FETCH_CONTACTS_ERROR', payload }))
            .toEqual(resultState)
    })


    it('should handle RECEIVE_CONTACT', () => {
        const payload = { contact: { externalIdentifier: '2', username: 'test2' } };
        const recentState = {
            ...defaultState,
            contactArray: [{externalIdentifier: '1', username: 'test1'}]
        };
        const resultState = {
            ...defaultState,
            contactArray: [{externalIdentifier: '1', username: 'test1'}, {externalIdentifier: '2', username: 'test2'}]
        };

        expect(ContactsReducer(recentState as ContactsState, { type:'RECEIVE_CONTACT', payload }))
            .toEqual(resultState)
    })
})

