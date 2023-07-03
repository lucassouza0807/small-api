require("dotenv").config
import { Request, Response } from "express"

export default class VerifyApiSecretBeforeRequest {
    static handle(request: Request, response: Response, next: any) {
        const { secretkey } = request.headers;
        
        if (!secretkey || secretkey !== process.env.API_SECRET_KEY) {
            return response.status(401).send("Not authorized");
        }

        return next();
    }
}