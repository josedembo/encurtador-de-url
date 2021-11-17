import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../models/errors/BadRequestError.model";

export function ErrorHandler(error: Error, Request: Request, response: Response, next: NextFunction) {

    if (error instanceof BadRequestError) {
        response.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

