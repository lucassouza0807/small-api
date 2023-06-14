import { UserRepository } from "@repositories/UserRepository";
import { prisma } from "@prisma/prisma";
import { Request, Response } from "express";
import { PasswordRulesHelper } from "@helpers/PasswordRulesHelper";

const userRepo = new UserRepository(prisma);

export default class UserController {

    static create = async (request: Request, response: Response) => {
        const password_min_length: number = 8;
        const { body } = request;
        const { password, password_confirmation } = request.body;
        const password_helper: any = new PasswordRulesHelper();

        if (password_helper.checkConfirmation(password, password_confirmation) === false) {
            return response.render("auth/register.ejs", {
                error: {
                    password: "As senhas não conferem"
                }
            });
        }

        if (password_helper.checkLength(password_min_length, password) === false) {
            return response.render("auth/register", {
                error: {
                    password: "A senha deve conter ao minímo 8 caracteres"
                }
            });
        }

        
        if (password_helper.check(password) === false) {
            return response.render("auth/register", {
                error: {
                    password: "A senha deve ao menos ter 1 símbolo e letras maiúsculas e minúsculas"
                }
            });
        }

        userRepo.create(body)
            .then(() => {
                return response.redirect("/login");
            })
            .catch((error: any) => {
                console.log(error);
                if (error.error_type === "email") {
                    return response.render("auth/register.ejs", {
                        error: {
                            email: error.message
                        }
                    })
                }
            })
    }
}