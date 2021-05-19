import {AnyAction, Reducer} from "redux";

const initialState: UserState = {
    externalIdentifier: "",
    username: "",
    phoneNumber : "",
    created: "",
    profileImage : undefined,
}

const reducer: Reducer<UserState> = (state: UserState = initialState, action: AnyAction) => {
    switch (action.type) {
        case "USER_AUTHENTICATION":
            return {
                ...action.payload.userInfo
            }
        default:
            return state;
    }
}

export { reducer as UserReducer }
