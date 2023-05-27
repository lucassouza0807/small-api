import jwt from "jsonwebtoken";
import { TypedRequestBody, TypedResponseBody } from "../interfaces/ExpressTypeInterface";
require("dotenv").config;

export class VerifyTokenMiddleware {
    handle = (request: TypedRequestBody<{ authorization: any, path: any, payload: any }>, response: TypedResponseBody, next: any) => {
        console.log(request.route.path);
        const token: any = (request.headers.authorization) ? request.headers.authorization.split(" ") : null;

        const decoded_token: any = (token) ? jwt.verify(token[1], `${process.env.API_KEY}`, (error: any, decoded: any) => {
            if (error) {
                return {
                    isValid: false,
                    message: "API SECRET invalida"
                }
            }

            return {
                isValid: true,
                payload: decoded
            }
        }) : null;

        if (!request.headers.authorization) {
            return response.status(401).json({
                message: "Token invalído ou inexistente"
            });
        }


        console.log(decoded_token);
        
        if (decoded_token.isValid == false) {
            return response.status(401).json({
                message: "Não autorizado"
            })

        } else if (decoded_token.isValid == true) {
            request.token_payload = decoded_token.payload
            return next();

        }

    }
}