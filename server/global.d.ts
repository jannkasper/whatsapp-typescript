import { Schema, Document} from "mongoose";

declare global {
    interface IMessage extends Document {
        _id: Schema.Types.ObjectId,
        type: string,
        value: string,
        status: string,
        sessionId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        created: Date
    }

    interface ISession extends  Document {
        _id: Schema.Types.ObjectId,
        externalIdentifier: string,
        created: Date
    }

    interface IUser extends Document {
        _id: Schema.Types.ObjectId,
        externalIdentifier: string,
        phoneNumber: number,
        username: string,
        password: string,
        profileImage: object,
        status: string,
        active: boolean,
        created: Date
    }

    interface IUserSession extends Document {
        _id: Schema.Types.ObjectId,
        externalIdentifier: string,
        sessionId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        socketId: string,
        publicKey: object,
        created: Date
    }
}
