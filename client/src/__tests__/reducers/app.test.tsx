import { AppReducer } from "../../reducers/app";
import {AnyAction} from "redux";

describe('App reducer', () => {
    it('should handle initial state', () => {
        const initialState = {
            openContactsNavigation: false,
        }
        expect(AppReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('should handle OPEN_CONTACTS_NAVIGATION', () => {
        const resultState = {
            openContactsNavigation: true,
        }
        expect(AppReducer({} as AppState, { type:'OPEN_CONTACTS_NAVIGATION', payload: {} }))
            .toEqual(resultState)
    })

    it('should handle CLOSE_CONTACTS_NAVIGATION', () => {
        const resultState = {
            openContactsNavigation: false,
        }
        expect(AppReducer({} as AppState, { type:'CLOSE_CONTACTS_NAVIGATION', payload: {} }))
            .toEqual(resultState)
    })
})

