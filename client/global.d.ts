
declare interface MainState {
    app: AppState,
    contacts: ContactsState,
    conversations: ConversationsState,
    user: UserState,
}
declare interface AppState {
    openContactsNavigation: boolean
}

declare interface ContactsState {
    pending: boolean,
    error: any,
    selectedContact: Contact | null,
    contactArray: Contact[]
}

declare interface ConversationsState {
    pending: boolean,
    error: any,
    selectedConversation: Conversation | null,
    conversationArray: Conversation[]
}

declare interface UserAuthentication {
    expiresAt: number,
    message: string,
    token: string,
    userInfo: UserState
}

declare interface UserState {
    externalIdentifier: string,
    username: string,
    phoneNumber: string,
    created: string,
    profileImage?: Image,
}

declare interface Contact {
    active: boolean,
    created: string,
    externalIdentifier: string,
    password: string,
    phoneNumber: number,
    status: string,
    username: string,
    _id: string,
    __v: number,
    profileImage?: Image
}

declare interface Image {
    data: string,
    fieldName: string,
    headers: {
        "content-disposition": string,
        "content-type": string,
    },
    name: string,
    originalFilename: string,
    path: string,
    size: number,
    type: string,
}

declare interface Conversation {
    contactExtId: string,
    sessionExtId?: string,
    conversation: Message[]
}

declare interface Message {
    userExtId: string,
    type: "image" | "text",
    value: string,
    status: "0",
    created: number
}

declare interface SendMessage {
    toSend: {
        userExtId: string,
        type: "image" | "text",
        value: string,
        status: "0",
        created: number
        sessionExtId: string | undefined,
        receiverExtId: string,
    },
    original: Message
}

