import { prisma } from "@utils/prisma/prisma";
import UserRepository from "@repositories/UserRepository";
import { Request, Response } from "express";
const userRepo = new UserRepository(prisma);

export default class UserController {
    async create(request: Request, response: Response) {
        const { body } = request;

        const { success, error } = await userRepo.create({
            data: body
        });

        if (error) {
            return response.status(400).json({
                message: error.message
            });
        }

        return response.status(200).json({
            success: true
        })
    }
}