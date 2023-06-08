import { UserRepository } from "@repositories/UserRepository";
import { TokenRepository } from "@repositories/TokenRepository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@prisma/prisma";

export class LoginController {
    login = (request: Request, response: Response) => {
        const userRepo = new UserRepository(prisma);
        const tokenRepo = new TokenRepository(prisma);

        const { email }: any = request.body;

        userRepo.get(email)
            .then(data => {
                if (data == null || undefined) {
                    return response.status(401).json({
                        success: false,
                        message: "Email incorreto"
                    })
                }

                if (!request.body.password || request.body.password == "" || null || undefined) {
                    return response.status(200).json({
                        success: false,
                        message: "Campo senha obrigatorio"
                    })
                }

                const password_checks: boolean = bcrypt.compareSync(request.body.password, data.password);

                if (password_checks == false) {
                    return response.status(401).json({
                        success: false,
                        message: "Senha incorreta"
                    })
                }


                const user_data: any = {
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

    logout = (token: any) => { }

}