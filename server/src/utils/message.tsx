import fs from "fs";
import Session from "../models/session";
import User from "../models/user";
import Message from "../models/message";
import { createNewSessions, createSessionExtIdentifier } from "./authentication";

export const determineValue = async (type: string, value: string | any) => {
    switch (type) {
        case "image":
            return Object.assign({date: fs.readFileSync((value as any).path).toString("base64")}, value)
        case "text":
        default:
            return value;
    }
}

export const createMessage = async (message: any) => {
    try {
        const { type, value, sessionExtId, userExtId, receiverExtId, created } = message;

        if (!type || !value || !userExtId || !receiverExtId) {
            return;
        }

        let existingSession = await Session.findOne({
            externalIdentifier: sessionExtId || createSessionExtIdentifier(userExtId, receiverExtId),
        });

        // Start new session
        if (!existingSession) {
            existingSession = await createNewSessions(userExtId, receiverExtId);
            if (!existingSession) {
                return;
            }
        }

        const sender = await User.findOne({
            externalIdentifier: userExtId,
        });

        if (sender === null) {
            return;
        }

        await new Message({
            type,
            value,
            sessionId: existingSession.id,
            userId: sender.id,
            created
        }).save();

    } catch (error) {
        return;
    }
}


export const createExampleConversation = async (userExtId: string) => {
    const defaultUser = await User.findOne({
        username: "Welcome",
    });

    if (defaultUser === null) {
        return;
    }

    const firstMessage = {
        type: "text",
        value: "Welcome in our Whatsapp application. " +
            "You can find all users just by starting new conversation ! " +
            "From now you can send messages and pictures to share your best moment too.",
        userExtId: defaultUser.externalIdentifier,
        receiverExtId: userExtId,
        created: Date.now(),
    }
    await createMessage(firstMessage);
}
