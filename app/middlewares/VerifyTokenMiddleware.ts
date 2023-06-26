require("dotenv").config;
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";
import { TokenRepository } from "../repositories/TokenRepository";

export default class VerifyTokenMiddleware {
    static handle = (request: Request, response: Response, next: any) => {

        const tokenRepo = new TokenRepository(prisma);

        const { authorization }: any = request.headers;

        if (!authorization) {
            return response.status(401).json({
                message: "Token invalído ou inexistente"
            });
        }
        
        const token: any = (authorization) ? authorization.split(" ") : null;

        const decoded_token: any = (token) ? jwt.verify(token[1], `${process.env.API_SECRET}`, (error: any, decoded: any) => {
            if (error) {
                return {
                    isValid: false,
                    message: "API SECRET invalida"
                }
            }

            if (decoded.isBlocked == true) {
                return {
                    isValid: false,
                    message: "Usuário bloqueado"
                }
            }

            return {
                isValid: true,
                payload: decoded
            }
        }) : null;

        if (decoded_token.isValid == false) {
            return response.status(401).json({
                message: decoded_token.message
            })

        } else if (decoded_token.isValid == true) {
            request.body.token_payload = decoded_token.payload
            return next();

        }

    }
}