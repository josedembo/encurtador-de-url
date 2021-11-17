import { config } from "../config/constants";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import shortId from "shortid";
import { URLModel } from "../models/URL.model";
import { BadRequestError } from "../models/errors/BadRequestError.model";


export class URLController {

    public async shortin(request: Request, response: Response): Promise<void> {
        const { originURL } = request.body;
        const url = await URLModel.findOne({ originURL });

        if (url) {
            response.status(StatusCodes.OK).json(url);
            return;
        }
        // criar um hash para a URL

        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`

        // salvar no banco de dados
        const newURL = await URLModel.create({ hash, originURL, shortURL });
        // retornar a url criada
        response.status(StatusCodes.OK).json(newURL);

    }

    public async redirect(request: Request, response: Response, next: NextFunction) {

        try {
            const { hash } = request.params;

            const url = await URLModel.findOne({ hash });

            if (!url) {
                // return response.status(StatusCodes.BAD_REQUEST).json({ error: "bad request" });
                throw new BadRequestError("url not found");
            }

            return response.redirect(url.originURL);

        } catch (error) {

            next(error);

        }
    }

}

