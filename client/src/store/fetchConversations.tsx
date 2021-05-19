import { fetchConversationsPending, fetchConversationsSuccess, fetchConversationsError } from "../actions"
import { publicFetch } from "../util/fetcher";
import {Dispatch} from "redux";

function fetchConversations(userExtId: string) {
    return (dispatch: Dispatch) => {
        dispatch(fetchConversationsPending());
        publicFetch.get(`messages/${userExtId}`)
            .then(res => {
                fetchConversationsSuccess({conversations: res.data })(dispatch);
                return;
            }, error => {
                fetchConversationsError(error)(dispatch);
            })
            .catch(error => {
                fetchConversationsError(error)(dispatch);
            })
    }
}

export default fetchConversations
