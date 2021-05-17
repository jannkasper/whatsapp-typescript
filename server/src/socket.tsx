import { getIO } from './index';
import User from "./models/user";
import { createMessage } from "./utils/message"

export default class Socket {
    private _userExtId: any;
    private socket: any;

    constructor(params: { userExtId: any; socket: any; }) {
        const { userExtId, socket } = params;

        this._userExtId = userExtId;
        this.socket = socket;
        this.socket.join(userExtId);
        this.handleInit()
    }

    async handleInit() {
        User.updateOne({ externalIntermediary: this._userExtId }, { active: true });
        await this.joinSession(this._userExtId, this.socket);
        this.handleSocket(this.socket);
    }

    joinSession(userExtId: string, socket: any) {
        return new Promise<void>((resolve, reject) => {
            socket.join(userExtId, (err: any) => {
                if (err) {
                    reject();
                }
                resolve();
            });
        });
    }

    async handleSocket (socket: any) {

        socket.on("MESSAGE", async (payload: any) => {
            const receiverExtId = payload.receiverExtId;

            const message = {
                type: payload.type,
                value: payload.value,
                sessionExtId: payload.externalIdentifier,
                userExtId: payload.userExtId,
                status: payload.status,
                created: payload.created,
            }

            getIO().to(receiverExtId).emit('MESSAGE', { message });
            createMessage(payload)
        })

        socket.on('disconnect', () => this.handleDisconnect(socket));

        socket.on('USER_DISCONNECT', () => this.handleDisconnect(socket));
    }

    async handleDisconnect(socket: any) {
        User.updateOne({ externalIntermediary: this._userExtId }, { active: false });
        socket.disconnect(true);
    }
}
