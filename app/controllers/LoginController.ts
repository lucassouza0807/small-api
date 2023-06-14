import { UserRepository } from "../repositories/UserRepository";
import { SessionRepository } from "../repositories/SessionRepository";
import { prisma } from "../../prisma/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { transport } from "../mail/mailSender";

const userRepo = new UserRepository(prisma);
const sessionRepo = new SessionRepository(prisma);

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

            console.log(password_checks);

            if (password_checks === false) {
                return response.render("auth/login.ejs", {
                    error: {
                        password: "Senha tá errada filha da puta"
                    },
                })
            }

            const session_id: string = uuidv4();

            sessionRepo.create({
                data: {
                    session_id: session_id,
                    ip: ip,
                    start: new Date().toLocaleString(),
                    user_id: data.usuario_id,
                    role: data.roles
                }
            }).then(() => {
                const splited_name: string[] = data.nome.split(" ");
                const user = {
                    session_id: session_id,
                    first_name: splited_name[0],
                    username: data.nome,
                    email: data.email,
                }

                request.session.user = user;

                transport.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: "bar@example.com, baz@example.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                });

                return response.redirect("/dashboard");
            })

        })
    }

    static logout = (request: Request, response: Response) => {
        if (!request.session.user) {
            return response.redirect("/");
        }

        const date_time: string = new Date().toLocaleString()

        sessionRepo.update({
            data: {
                end: date_time,
                is_active: false,
            },
            where: {
                session_id: `${request.session.user?.session_id}`
            }
        }).then(() => {
            request.session.destroy(() => {
                return response.redirect("/");
            })

        })
            .catch((error: Object) => {
                console.log(error);
            });

    }
}