import { UserRepository } from "@repositories/UserRepository";
import { prisma } from "@prisma/prisma";
import { Request, Response } from "express";
//Database instance
const user = new UserRepository(prisma);//Injects database denpency

export class UserController {
    createUser = (request: Request, response: Response) => {
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

    getUser = (request: Request, response: Response) => {
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

                if (data == null || undefined || "") {
                    return response.status(400).json({
                        success: false,
                        message: "Usuario não econtrado"
                    })
                }

                return response.status(200).json(data);

            });
    }

    getAllUsers = (request: Request, response: Response) => {
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

    deleteUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.delete({
            where: {
                email: email
            }
        })
            .then(feedback => {
                if (feedback.success == false) {
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

    updateUser = (request: Request, response: Response) => {
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
    }

    blockUser = (request: Request, response: Response) => {
        const { email } = request.body;
        user.block(email)
            .then(feedback => {
                if (feedback.success == false) {
                    return response.status(400).json({
                        message: "Erro"
                    })
                }

                return response.status(200).json({
                    message: "Usuario bloqueado"
                })
            });
    }

    unBlockUser = (request: Request, response: Response) => {
        const { email } = request.body;
        user.unBlock(email)
            .then(feedback => {
                if (feedback.success == false) {
                    return response.status(400).json({
                        message: "Erro"
                    })
                }

                return response.status(200).json({
                    message: "Usuario desbloqueado"
                })
            });
    }

}