import { Prisma, PrismaClient } from "@prisma/client";
import sha256 from 'crypto-js/sha256';
import { TypedResponseBody, TypedRequestBody } from "../interfaces/ExpressTypeInterface";
import { RepositoryInterface } from "../interfaces/RepositoryInterface";

export class UserRepository implements RepositoryInterface {
    private GENERIC_MESSAGE_ERROR: string = "Erro interno";
    private UNIQUE_ERROR_CONSTRAINT_MESSAGE: string = "O usuário já está em uso";
    private INEXISTENT_FIELD_ON_TABLE_ERROR_MESSAGE: string = "O indice não existe no sistema";
    private database: any;
    /**
     * @database any
     * Handles database orm library dependecy, case of need of change the library
     * can change quickly the library with just some change of lines of code
     */
    //Get the user data

    constructor(database: any) {
        //Injects the database depedency.
        this.database = database;
    }
    get = async (cpf: string) => {
        try {
            return await this.database.usuarios.findUnique({
                where: {
                    cpf: cpf
                },
                select: {
                    nome: true,
                    email: true,
                    cpf: true,
                    role: true
                }
            }).then((data: any) => {
                return data === null
                    ? { message: "Usuário não encontrado", success: false }
                    : { data: data, success: true }
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                //Return a generic error message
                return {
                    success: false,
                    message: this.GENERIC_MESSAGE_ERROR
                }
            }
        }
    }

    getAll = async () => {
        try {
            return await this.database.usuarios.findMany({
                select: {
                    nome: true,
                    email: true,
                    cpf: true,
                    role: true
                }
            })
                .then((data: any) => {
                    return {
                        success: true,
                        data: data,
                    }
                })
        } catch (error: any) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: this.GENERIC_MESSAGE_ERROR
                }
            }
        }
    }
    //Create a new user with the body of the request
    create = async (body: any) => {
        const hashed_password: any = sha256(body.password);

        try {
            return await this.database.usuarios.create({
                data: {
                    nome: body.nome,
                    cpf: body.cpf,
                    email: body.email,
                    password: hashed_password.toString(),
                    cargo: body.cargo
                }
            }).then(() => {
                return {
                    success: true,
                    message: "Usuário criado com sucesso"
                };
            })

        } catch (error: any) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return {
                        success: false,
                        message: this.UNIQUE_ERROR_CONSTRAINT_MESSAGE
                    }
                }

                if (error.code === 'P2003') {
                    return {
                        sucess: false,
                        message: this.GENERIC_MESSAGE_ERROR
                    }
                }
            } else {
                //Handles with not 
                return {
                    succes: false,
                    message: this.GENERIC_MESSAGE_ERROR
                }
            }

            throw error;
        }
    }

    delete = async (cpf: string) => {
        try {
            return await this.database.usuarios.delete({
                where: {
                    cpf: cpf
                }
            }).then(() => {
                return {
                    success: true,
                    message: "Usuario excluído com sucesso"
                };
            })
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    return {
                        success: false,
                        message: this.INEXISTENT_FIELD_ON_TABLE_ERROR_MESSAGE
                    }
                }
                return {
                    success: false,
                    error_message: this.GENERIC_MESSAGE_ERROR
                }
            }
        }
    }

    update = async (body: any) => {
        try {
            await this.database.usuarios.update({
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
            }).then(() => {
                return {
                    success: true,
                    message: "Dados atualizados"
                }
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: this.GENERIC_MESSAGE_ERROR
                }
            }
            throw error;
        }
    }


    block = async (cpf: string) => {
        try {
            return await this.database.usuarios.update({
                where: {
                    cpf: cpf
                },
                data: {
                    isBlocked: true
                }
            }).then(() => {
                return {
                    success: true,
                    message: "Usuario bloqueado"
                };
            });

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: this.GENERIC_MESSAGE_ERROR
                }
            }
            throw error;
        }
    }

    unBlock = async (cpf: string) => {
        try {
            return await this.database.usuarios.update({
                where: {
                    cpf: cpf
                },
                data: {
                    isBlocked: false
                }
            }).then(() => {
                return {
                    success: true,
                    message: "Usuario desbloqueado"
                };
            });

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: this.GENERIC_MESSAGE_ERROR
                }
            }
            throw error;
        }
    }


}