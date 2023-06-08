import { UserRepository } from "@repositories/UserRepository";
import { prisma } from "@prisma/prisma";
import { Request, Response } from "express";
//Database instance
const user = new UserRepository(prisma);//Injects database denpency

export class UserController {
    createUser = (request: Request, response: Response) => {
        user.create(request.body)
            .then(feedback => {
                if (feedback.success == false) {
                    return response.status(400).json(feedback)
                }

                return response.status(200).json({
                    success: true,
                    message: "Usuario criado com sucesso"
                })
            })
    }

    getUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.get(email)
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
        user.getAll()
            .then(data => {
                return response.status(200).json(data);
            })
    }

    deleteUser = (request: Request, response: Response) => {
        const { email } = request.body;

        user.delete(request.params.email)
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
    }

    updateUser = (request: Request, response: Response) => {
        user.update(request.body)
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