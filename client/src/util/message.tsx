const convertImage = (imageFile: File): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            // @ts-ignore
            resolve(event.target.result)
        };
        reader.readAsDataURL(imageFile);
    });
}

export const prepare = (payload: { type: "image" | "text", value: File | string }, state: MainState): Promise<SendMessage> =>
    new Promise( async resolve => {

        const original: Message = {
            type: payload.type,
            status: "0",
            value: '',
            userExtId: state.user.externalIdentifier,
            created: Date.now()
        }

        if (payload.value instanceof File) {
            original.value = await convertImage(payload.value);
        } else {
            original.value = payload.value;
        }

        resolve ({
            toSend: {
                ...original,
                sessionExtId: (state.conversations.selectedConversation as Conversation).sessionExtId,
                receiverExtId: (state.conversations.selectedConversation as Conversation).contactExtId,
            },
            original: original
        })
    });
