import jwt from "jsonwebtoken";
import config from "../config.js";
import { fromString } from "uuidv4";
import Session from "../models/session.js";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";

export const createToken = (user: IUser) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            phoneNumber: user.phoneNumber
        },
        config.jwt.secret,
        { algorithm: "HS256", expiresIn: config.jwt.expiry }
    )
}

export const verifyPassword = (passwordAttempt: string, passwordDatabase: string) => {
    return passwordAttempt === passwordDatabase;
}

export const createSessionExtIdentifier = (...userExtIdArray: string[]) => {
    userExtIdArray.sort()
    const singleElement = userExtIdArray.join("");
    return fromString(singleElement);
}

export const createNewSessions = async (...userExtIdArray: string[]) => {
    const savedNewSession = await new Session({ externalIdentifier: createSessionExtIdentifier(...userExtIdArray) }).save();

    for (const userExtId of userExtIdArray) {

        const user: IUser | null = await User.findOne({
            externalIdentifier: userExtId,
        })

        if (user === null) {
            continue;
        }

        await new UserSession({
            externalIdentifier: createSessionExtIdentifier(userExtId),
            sessionId: savedNewSession.id,
            userId: user.id,
            created: savedNewSession.created
        }).save();
    }

    return savedNewSession;

}
