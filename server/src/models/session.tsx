import { model, Schema, Model } from "mongoose";

const SessionSchema: Schema = new Schema({
    externalIdentifier: { type : String, required: true, unique: true},
    created: { type: Date, default: Date.now() }
})

const Session: Model<ISession> = model('session', SessionSchema);
export default Session
