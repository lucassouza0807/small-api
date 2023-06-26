import { UserRepository } from "../repositories/UserRepository";
import { prisma } from "../../prisma/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { transport } from "../mail/mailSender";

const userRepo = new UserRepository(prisma);

export default class loginController {
    static login = (request: Request, response: Response) => {
        const { email, password } = request.body;
        const { ip } = request;

        userRepo.get({
            select: {
                usuario_id: true,
                email: true,
                password: true,
                nome: true,
                role: true
            },
            where: {
                email: email
            }
        }).then((data: any) => {
            console.log(data)
            if (data === null) {
                return response.render("auth/login.ejs", {
                    error: {
                        email: "Email errado arrombado"
                    },
                })
            }

            const password_checks: boolean = bcrypt.compareSync(password, data.password);

            if (password_checks === false) {
                return response.render("auth/login.ejs", {
                    error: {
                        password: "Senha tá errada filha da puta"
                    },
                })
            }

            const session_id: string = uuidv4();

            const splited_name: string[] = data.nome.split(" ");
            const user = {
                session_id: session_id,
                first_name: splited_name[0],
                username: data.nome,
                email: data.email,
            }

            request.session.user = user;

            return response.redirect("/dashboard");


        })
    }

    static logout = (request: Request, response: Response) => {
        if (!request.session.user) {
            return response.redirect("/");
        }

        request.session.destroy(() => {
            return response.redirect("/");
        })

    }
}