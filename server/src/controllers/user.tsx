import jwtDecode, { JwtPayload } from "jwt-decode";
import shortId from 'shortid';
import fs from "fs";
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from "express-validator";
import User from "../models/user"
import { createToken, verifyPassword } from "../utils/authentication";
import { createExampleConversation } from "../utils/message";
import { getIO } from "../index";

interface MulterRequest extends Request {
    files: any;
}

export const signup = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    try {
        const { phoneNumber, username, password } = req.body;

        const existingUsername = await User.findOne({ username: { $regex : new RegExp(username, "i") } })

        if (existingUsername) {
            return res.status(400).json({ hasError: true, field: "username", message: "Username already exists." });
        };

        const userData = {
            externalIdentifier: shortId.generate(),
            phoneNumber,
            username,
            password,
            profileImage: undefined,
        };

        const documentFile  = (req as MulterRequest).files;
        if (documentFile && documentFile.profileImage) {
            userData.profileImage = {
                ...documentFile.profileImage,
                data: fs.readFileSync(documentFile.profileImage.path).toString("base64")
            }
        }

        const savedUser: IUser = await new User(userData).save();

        if (savedUser) {
            const token: string = createToken(savedUser);
            const decodedToken = jwtDecode<JwtPayload>(token);
            const expiresAt = decodedToken.exp;

            getIO().emit("USER_ENTER", { contact: savedUser });

            if (process.env.JEST_WORKER_ID === undefined) {
                await createExampleConversation(savedUser.externalIdentifier);
            }

            const userInfo = {
                externalIdentifier: savedUser.externalIdentifier,
                username: savedUser.username,
                phoneNumber: savedUser.phoneNumber,
                profileImage: savedUser.profileImage,
                created: savedUser.created
            }

            return res.json({
                message: "User created!",
                token,
                userInfo,
                expiresAt
            });
        } else {
            return res.status(400).json({ message: "There was a problem creating your account."})
        }

    } catch (error) {
        return res.status(400).json({ message: "There was a problem creating your account." });
    }
}

export const authenticate = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({onlyFirstError: true });
        return res.status(422).json({ errors });
    }

    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username: { $regex : new RegExp(username, "i") }
        });

        if (!user) {
            return res.status(403).json({ hasError: true, field: "username", message: "Username doesn't exists." });
        }

        const passwordValid = await verifyPassword(password, user.password);

        if (passwordValid) {
            const token = createToken(user);
            const decodedToken = jwtDecode<JwtPayload>(token);
            const expiresAt = decodedToken.exp;

            const userInfo = {
                externalIdentifier: user.externalIdentifier,
                username: user.username,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage,
                created: user.created
            }

            return res.json({
                message: "Authentication successful!",
                token,
                userInfo,
                expiresAt
            });
        } else {
            return res.status(403).json({ hasError: true, field: "password", message: "Wrong password." });
        }

    } catch (error) {
        return res.status(400).json({ message: "There was a problem creating your account." });
    }
}

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userExtId = req.params.userExtId;
        const users = await User.find({ externalIdentifier: {$ne: userExtId} });
        res.json(users);
    } catch (error) {
        next(error);
    }
}
export const validateAuthorisation = [
    body("username")
        .exists()
        .trim()
        .withMessage("is required")

        .notEmpty()
        .withMessage("cannot be blank")

        .isLength({ max: 16 })
        .withMessage('must be at most 16 characters long')

        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('contains invalid characters'),

    body('password')
        .exists()
        .trim()
        .withMessage('is required')

        .notEmpty()
        .withMessage('cannot be blank')

        .isLength({ min: 6 })
        .withMessage('must be at least 6 characters long')

        .isLength({ max: 50 })
        .withMessage('must be at most 50 characters long')
]
export const validateUser = [
    ...validateAuthorisation,
    body("phoneNumber")
        .exists()
        .trim()
        .withMessage("is required")

        .notEmpty()
        .withMessage("cannot be blank")

        .isLength({ min:6, max: 12 })
        .withMessage('must be between 6 and 12 characters long')

        .matches(/^[0-9_-]+$/)
        .withMessage('contains invalid characters'),
];
