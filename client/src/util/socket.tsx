import React from "react";
import socketIO, { Socket } from "socket.io-client";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : `https://${process.env.REACT_APP_SITE_NAME}`;

let socket: Socket;

export const connect = (userExtId: string): Socket => {
    socket = socketIO(baseURL, {
        query: { userExtId },
        forceNew: true
    });
    return socket;
};

export const getSocket = () => socket;
