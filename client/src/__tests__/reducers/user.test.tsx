import { UserReducer } from "../../reducers/user";
import {AnyAction} from "redux";

describe('User reducer', () => {
    it('should handle initial state', () => {
        const initialState = {
            externalIdentifier: "",
            username: "",
            phoneNumber : "",
            created: "",
            profileImage : undefined,
        }
        expect(UserReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('should handle USER_AUTHENTICATION', () => {
        const userInfo = {
            externalIdentifier: "externalIdentifierTest",
            username: "usernameTest",
            phoneNumber : "phoneNumberTest",
            created: "createdTest",
            profileImage : {type: 'jpeg', data: 'test'},
        }
        expect(UserReducer({} as UserState, { type:'USER_AUTHENTICATION', payload: {userInfo} }))
            .toEqual(userInfo)
    })
})

