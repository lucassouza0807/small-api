import { UserRepository } from "@repositories/UserRepository";
import { TokenRepository } from "@repositories/TokenRepository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@prisma/prisma";

const userRepo = new UserRepository(prisma);
const tokenRepo = new TokenRepository(prisma);

export class LoginController {
    login = (request: Request, response: Response) => {
        const { email, password }: any = request.body;
                
        if (!email || email === "" || null || undefined) {
            return response.status(400).json({
                message: "Campo Email obrigatório"
            })
        }

        if (!password || password === "" || null || undefined) {
            return response.status(400).json({
                message: "Campo senha obrigatório"
            })
        }


        userRepo.get({
            select: {
                nome: true,
                usuario_id: true,
                email: true,
                password: true,
                role: true
            },
            where: {
                email: email
            }
        })
            .then(data => {
                if (data == null || undefined) {
                    return response.status(401).json({
                        message: "Email incorreto"
                    })
                }

                const password_checks: boolean = bcrypt.compareSync(password, data.password);

                if (password_checks == false) {
                    return response.status(401).json({
                        message: "Senha incorreta"
                    })
                }


                const user_data: any = {
                    usuario_id: data.usuario_id,
                    nome: data.nome,
                    email: data.email,
                    isBlocked: data.isBlocked,
                    permission: data.role.permissions
                }

                const token: string = jwt.sign(user_data, `${process.env.API_SECRET}`, {
                    algorithm: "HS256"
                });

                tokenRepo.registerUserToken(token, data.usuario_id.toString());

                return response.json({
                    token: token
                })

            })

    }

    logout = (request: Request, response: Response) => {
        if (!request.headers.authorization) {
            return response.status(400).json({
                message: "Token obrigario"
            })
        }

        const { authorization } = request.headers;

        const token: string[] = authorization.split(" ");

        const decoded_token: any = jwt.verify(token[1], `${process.env.API_SECRET}`, (error: any, decoded) => {
            if (error) {
                return response.status(400).json({
                    message: "API SECRET invalida"
                })
            }

            return { payload: decoded }
        })

        const { payload } = decoded_token;

        return tokenRepo.invalidateUserToken(token[1], parseInt(payload.usuario_id))
            .then(feedback => {
                response.status(200).json({
                    message: "Logout efetuado"
                })
            })
            .catch(error => {
                if (error.code === "P2002") {
                    response.status(400).json({
                        message: `O ${error.field} já foi invalidado`
                    })
                }
            })
    }
}