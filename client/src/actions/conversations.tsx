import { Dispatch } from "redux";
import { prepare as prepareMessage } from "../util/message"
// import { getSocket } from "../util/socket";


export const fetchConversationsPending = () => ({ type: "FETCH_CONVERSATIONS_PENDING" });

export const fetchConversationsSuccess = () => async (dispatch: Dispatch) => {
    dispatch({ type: "FETCH_CONVERSATIONS_SUCCESS" });
};

export const fetchConversationsError = (payload: any) => async (dispatch: Dispatch) => {
    dispatch({ type: "FETCH_CONVERSATIONS_ERROR", payload });
};

export const selectConversation = (payload: { contactExtId: string }) => async (dispatch: Dispatch) => {
    dispatch({ type: "SELECT_CONVERSATION", payload });
};

export const receiveMessage = (payload: { message: Message }) => async (dispatch: Dispatch) => {
    dispatch({ type: "RECEIVE_MESSAGE", payload });
};

export const createMessage = (payload: { type: "image" | "text", value: File | string }) => async (dispatch: Dispatch, getState: Function) => {
    const state: MainState = getState();
    const message: SendMessage = await prepareMessage(payload, state);

    dispatch({ type: "CREATE_MESSAGE", payload: { message: message.original }});

    // getSocket().emit("MESSAGE", message.toSend);
}
