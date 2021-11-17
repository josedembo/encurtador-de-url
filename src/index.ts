import { URLController } from "./controller/URLController"
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MongoConnection } from "./database/MongoConnection";
import { ErrorHandler } from "./middlewares/ErrorHandler.middleware"

// cofiguração do servidor
const api = express();
api.use(express.json());

const urlControler = new URLController();
const database = new MongoConnection();
database.connect();

api.post("/shorten", urlControler.shortin);

api.get("/:hash", urlControler.redirect);

api.get("/", (request: Request, response: Response) => {
    return response.sendStatus(StatusCodes.OK);
});

api.use(ErrorHandler);


api.listen(5000, () => {
    console.log("server is ronning at port 5000");
});