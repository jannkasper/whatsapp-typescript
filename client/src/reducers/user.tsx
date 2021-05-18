import { AnyAction } from "redux";

const initialState: UserState = {
    externalIdentifier: "",
    username: "",
    phoneNumber : "",
    created: "",
    profileImage : undefined,
}

const user = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case "USER_AUTHENTICATION":
            return {
                ...action.payload.userInfo
            }
        default:
            return state;
    }
}

export default user
