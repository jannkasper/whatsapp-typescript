import {Router, Application, Request, Response, NextFunction} from "express";

const router: Router = Router();

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
