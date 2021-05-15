import { model, Schema, Model } from "mongoose";

const UserSessionSchema: Schema = new Schema({
    externalIdentifier: { type : String, required: true, unique: true},
    sessionId: { type: Schema.Types.ObjectId, ref: "session", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    sockedId: { type : String },
    publicKey: { type: Object },

    created: { type: Date, default: Date.now() }
});

const UserSession: Model<IUserSession> = model('userSession', UserSessionSchema);
export default UserSession
