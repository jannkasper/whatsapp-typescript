import { model, Schema, Model } from "mongoose";

const MessageSchema: Schema = new Schema({
    type: { type: String, default: "text" },
    value: { type: String, required: true },
    status: { type: String, default: 0 },
    sessionId: { type: Schema.Types.ObjectId, ref: "session", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    created: { type: Date, default: Date.now() }
})

const Message: Model<IMessage> = model('user', MessageSchema);
export default Message
