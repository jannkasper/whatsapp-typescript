import { body, validationResult } from "express-validator";
import { createSessionExtIdentifier, createNewSessions } from "../utils/authentication"
import User from "../models/user";
import Session from "../models/session";
import UserSession from "../models/userSession";
import Message from "../models/message"
import { determineValue } from "../utils/message";
import {Request, Response} from "express";

interface MulterRequest extends Request {
    files: any;
}

export const loadMessages =  async  (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    const userExtId = req.params.userExtId;

    if (!userExtId) {
        return res.status(400).json({ message: "Missed userExtId in request."})
    }

    const user: IUser | null = await User.findOne({
        externalIdentifier: userExtId,
    });

    if (user == null) {
        return res.status(400).json({ message: "There was a problem find user in database."})
    }

    const userSessionList: IUserSession[] = await UserSession.find({
        userId : user.id,
    });

    const resultArray = [];
    for(const userSession of userSessionList) {
        const messageList: IMessage[] = await Message.find({
            sessionId : userSession.sessionId,
        }).sort("created");

        const contactUserSession: IUserSession | null = await UserSession.findOne({
            sessionId : userSession.sessionId,
            userId: { $ne: userSession.userId },
        });
        if (contactUserSession == null) {
            throw Error();
        }

        const session: ISession | null = await Session.findOne({
            _id : userSession.sessionId,
        });

        const contact: IUser | null = await User.findOne({
            _id: contactUserSession.userId
        });

        if (session == null || contact == null) {
            throw Error();
        }

        const conversationElement = {
            conversation: messageList.map(message => {
                return {
                    type: message.type,
                    value: message.value,
                    status: message.status,
                    created: message.created,
                    userExtId: String(message.userId) === String(user._id) ? user.externalIdentifier : contact.externalIdentifier
                }}),
            sessionExtId: session.externalIdentifier,
            contactExtId: contact.externalIdentifier,
        }

        resultArray.push(conversationElement);
    }
    return res.json(resultArray);
}

export const createMessage = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    try {
        const { type, sessionExtId, userExtId, receiverExtId, created } = req.body;
        const documentFile  = (req as MulterRequest).files;
        const value = (documentFile && documentFile.value) || req.body.value;

        if (!type || !value || !userExtId || !receiverExtId) {
            return res.status(400).json({ message: "Missed required values in request."})
        }

        const sender: IUser | null = await User.findOne({
            externalIdentifier: userExtId,
        });

        const receiver: IUser | null = await User.findOne({
            externalIdentifier: receiverExtId,
        });

        if (sender == null || receiver == null) {
            return res.status(400).json({ message: "There was a problem find user in database."})
        }

        let existingSession: ISession | null = await Session.findOne({
            externalIdentifier: sessionExtId || createSessionExtIdentifier(userExtId, receiverExtId),
        });

        // Start new session
        if (existingSession == null) {
            existingSession = await createNewSessions(userExtId, receiverExtId);
            if (!existingSession) {
                return res.status(400).json({ message: "Problem creating new session"})
            }
        }

        const savedMessage = await new Message({
            type,
            value: await determineValue(type, value),
            sessionId: existingSession.id,
            userId: sender.id,
            created
        }).save();

        return res.json({
            type: savedMessage.type,
            value: savedMessage.value,
            sessionExtId: existingSession.externalIdentifier,
            userExtId: sender.externalIdentifier,
            status: savedMessage.status,
            created: savedMessage.created,
        });
    } catch (error) {
        return res.status(400).json({ message: "There was a problem save your message." });
    }
}

export const validateMessage  = [];
