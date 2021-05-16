import {Router, Application, Request, Response, NextFunction} from "express";
import {authenticate, listUsers, signup, validateUser, validateAuthorisation} from "./controllers/user";
import {createMessage, loadMessages, validateMessage} from "./controllers/message";

const router: Router = Router();

// authentication
router.post('/signup', validateUser, signup);
router.post('/authenticate', validateAuthorisation, authenticate);

// users
router.get("/users/:userExtId", listUsers);

// messages
router.post("/message", validateMessage, createMessage);
router.get("/messages/:userExtId", loadMessages);

export default (app: Application) => {
    app.use("/api", router);


    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error("Not found");
        res.status(404);
        next(error);
    });

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500).json({message: error.message})
    });
}
