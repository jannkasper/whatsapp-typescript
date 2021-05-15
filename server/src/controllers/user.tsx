import jwtDecode from "jwt-decode";
import shortId from 'shortid';
import fs from "fs";
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from "express-validator";
import User from "../models/user.js"
import { createToken, verifyPassword } from "../utils/authentication.js";
import { createExampleConversation } from "../utils/message.js";
import { getIO } from "../index.js";


export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userExtId = req.params.userExtId;
        const users = await User.find({ externalIdentifier: {$ne: userExtId} });
        res.json(users);
    } catch (error) {
        next(error);
    }
}
