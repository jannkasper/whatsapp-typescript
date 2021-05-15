import { getIO } from "./index";

export default class Socket {
    private _userExtId: any;
    private socket: any;

    constructor(params: { userExtId: any; socket: any; }) {
        const { userExtId, socket } = params;

        this._userExtId = userExtId;
        this.socket = socket;
        this.socket.join(userExtId);
    }

}
