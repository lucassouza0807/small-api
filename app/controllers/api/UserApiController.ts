import { UserRepository } from "../../repositories/UserRepository";
import { prisma } from "../../../prisma/prisma";
import { Request, Response } from "express";
//Database instance
const user = new UserRepository(prisma);//Injects database denpency

export default class UserApiController {
    static createUser = (request: Request, response: Response) => {
        user.create(request.body)
            .then(() => {
                return response.status(200).json({
                    message: "Usuario criado com sucesso"
                })
            })
            .catch((error: any) => {
                return response.status(400).json({
                    message: error.message
                })
            })
    }

    static getUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.get({
            select: {
                email: true,
                nome: true,
                role: true,
            },
            where: {
                email: email
            }
        })
            .then(data => {
                if (data === null || undefined || "") {
                    return response.status(400).json({
                        message: "Usuario não econtrado"
                    })
                }

                return response.status(200).json(data);

            })
            .catch((error: any) => {

            });
    }

    static getAllUsers = (request: Request, response: Response) => {
        user.getAll({
            select: {
                email: true,
                nome: true,
                role: true,
            }
        })
            .then(data => {
                return response.status(200).json(data);
            })
    }

    static deleteUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.delete({
            where: {
                email: email
            }
        })
            .then(feedback => {
                if (feedback.success === false) {
                    return response.status(400).json({
                        message: feedback.message
                    })
                }

                return response.status(200).json({
                    message: "Usuario deletado"
                });
            })
            .catch((error: any) => {
                return response.status(400).json({
                    message: error.message
                });
            })
    }

    static updateUser = (request: Request, response: Response) => {
        const { body } = request;

        user.update({
            where: {
                email: body.email
            },
            data: {
                nome: body.nome,
                cpf: body.cpf,
                email: body.email,
                role_id: body.role_id,
                cargo: body.cargo
            }
        })
            .then(feedback => {
                return response.status(200).json(feedback);
            })
            .catch((error: any) => {
                return response.status(400).json({
                    message: error.message
                })
            })
    }

    static blockUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.block(email)
            .then(() => {
                return response.status(200).json({
                    message: "Dados atualizado com sucesso"
                })
            })
            .catch((error: any) => {
                return response.status(400).json({
                    message: error.message
                });
            });
    }

    static unBlockUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.unBlock(email)
            .then(() => {
                return response.status(200).json({
                    message: "Usuario bloqueado com sucesso"
                });
            })
            .catch((error: any) => {
                return response.status(400).json({
                    message: error.message
                })
            });

    }

}