import { model, Schema, Model } from "mongoose";

const UserSchema: Schema = new Schema({
    externalIdentifier: { type : String, required: true, unique: true},

    phoneNumber: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage : { type: Object },

    status: { type: String, default: "Hey there! I am using WhatsApp", required: true},
    active: { type: Boolean, default: false },
    created: { type: Date, default: Date.now() },

});

const User: Model<IUser> = model('user', UserSchema);
export default User
