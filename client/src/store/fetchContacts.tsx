import { fetchContactsPending, fetchContactsSuccess, fetchContactsError } from "../actions";
import {publicFetch} from "../util/fetcher";
import {Dispatch} from "redux";

function fetchContacts(userExtId: string) {
    return (dispatch: Dispatch) => {
        dispatch(fetchContactsPending());
        publicFetch.get(`users/${userExtId}`)
            .then(res => {
                fetchContactsSuccess({contacts: res.data })(dispatch);
                return;
            }, error => {
                fetchContactsError(error)(dispatch);
            })
            .catch(error => {
                fetchContactsError(error)(dispatch);
            })
    }
}

export default fetchContacts
