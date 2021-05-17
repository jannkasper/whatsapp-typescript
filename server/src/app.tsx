import express from "express";
import cors from "cors";
import morgan from "morgan";
import formData from "express-form-data";
import bodyParser from "body-parser";
import setRoutes from "./routes";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(formData.parse())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
setRoutes(app);

export default app
