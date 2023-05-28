import { TypedRequestBody, TypedResponseBody } from "../interfaces/ExpressTypeInterface";
import { UserRepository } from "../repositories/UserRepository";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

//Database instance
const prisma = new PrismaClient();
const user = new UserRepository(prisma);//Injects database denpency

export class UserController {
    createUser = (request: TypedRequestBody<{ body: any }>, response: TypedResponseBody): Express.Response => {
        return user.create(request.body)
            .then(feedback => {
                response.status(200).json(feedback)
            })
    }

    getUser = (request: TypedRequestBody<{ cpf: string }>, response: TypedResponseBody) => {
        return user.get(request.params.cpf)
            .then(data => {
                data.success == true
                    ? response.status(200).json(data.data)
                    : response.status(200).json({
                        message: data.message
                    })
            });
    }

    getAllUsers = (request: Express.Request, response: TypedResponseBody) => {
        return user.getAll()
            .then(data => {
                console.log(data);
                data.success === true
                    ? response.status(200).json(data.data)
                    : response.status(200).json(data.message)
            })
    }
    deleteUser = (request: TypedRequestBody<{ cpf: string }>, response: TypedResponseBody) => {
        return user.delete(request.params.cpf)
            .then((feedback) => {
                response.status(200).json(feedback)
            })
    }

    updateUser = (request: TypedRequestBody<{ body: any }>, response: TypedResponseBody) => {
        return user.update(request.body)
            .then(feedback => {
                response.status(200).json(feedback);
            })
    }

    blockUser = (request: TypedRequestBody<{ cpf: string }>, response: TypedResponseBody) => {
        return user.block(request.params.cpf)
            .then(feedback => {
                response.status(200).json(feedback)
            });
    }

    unBlockUser = (request: TypedRequestBody<{ cpf: string }>, response: TypedResponseBody) => {
        return user.unBlock(request.params.cpf)
            .then(feedback => {
                response.status(200).json(feedback);
            });
    }

}