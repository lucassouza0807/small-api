import { UserRepository } from "@repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import { Jwt } from "jsonwebtoken";

const prisma = new PrismaClient();

export class LoginHandler {
    login = (email: string, password: string) => {
        
    }
}