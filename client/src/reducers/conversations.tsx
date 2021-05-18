import { AnyAction } from "redux";

const initialState: ConversationsState = {
    pending: false,
    error: null,
    selectedConversation: null,
    conversationArray: [ ]
}

const conversations = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case "SELECT_CONVERSATION":
            let selectedConversation = state.conversationArray.find(conversation => conversation.contactExtId === action.payload.contactExtId);
            if (!selectedConversation) {
                // start new conversation
                selectedConversation = { contactExtId: action.payload.contactExtId, conversation: [] };
            }
            return {
                ...state,
                conversationArray: state.conversationArray.includes(selectedConversation) ? state.conversationArray : [...state.conversationArray, selectedConversation],
                selectedConversation: selectedConversation
            }
        case "CREATE_MESSAGE":
            if (state.selectedConversation == null) {
                return;
            }
            const updateConversation = {
                ...state.selectedConversation,
                conversation: [...state.selectedConversation.conversation, action.payload.message]
            }
            return {
                ...state,
                conversationArray: [...state.conversationArray.map(element => element.contactExtId === updateConversation.contactExtId ? updateConversation : element)],
                selectedConversation: updateConversation
            }
        case "RECEIVE_MESSAGE":
            const { message } = action.payload;
            let updateSelectedConversation = null;
            debugger;
            if ( state.selectedConversation && state.selectedConversation.contactExtId === message.userExtId ) {
                updateSelectedConversation = {...state.selectedConversation, conversation: [...state.selectedConversation.conversation, message ]}
            } else {
                updateSelectedConversation = state.selectedConversation;
            }

            let updateConversationArray = null;
            const findConversation = state.conversationArray.find(conversation => conversation.contactExtId === message.userExtId);
            if (findConversation) {
                updateConversationArray = [...state.conversationArray
                    .map(element => element.contactExtId === message.userExtId
                        ? {...element, conversation: [...element.conversation, message ]} : element)]
            } else {
                updateConversationArray = [...state.conversationArray, {contactExtId: message.userExtId, sessionExtId: message.sessionExtId, conversation: [message]}]
            }

            return {
                ...state,
                selectedConversation: updateSelectedConversation,
                conversationArray: updateConversationArray
            }
        case "ENTER_SESSION_IDENTIFIER":
            const updateConvWithSessionExtId = {
                ...state.selectedConversation,
                sessionExtId: action.payload.sessionExtId
            }
            return {
                ...state,
                conversationArray: [...state.conversationArray.map(element => element.contactExtId === updateConvWithSessionExtId.contactExtId ? updateConvWithSessionExtId : element)],
                selectedConversation: updateConvWithSessionExtId
            }
        case "FETCH_CONVERSATIONS_PENDING":
            return {
                ...state,
                pending: true,
            }
        case "FETCH_CONVERSATIONS_SUCCESS":
            return {
                ...state,
                pending: false,
                conversationArray: action.payload.conversations,
            }
        case "FETCH_CONVERSATIONS_ERROR":
            return {
                ...state,
                pending: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}


export default conversations
