import { Prisma } from "@prisma/client";
import { RepositoryInterface } from "../interfaces/RepositoryInterface";
import bcript from "bcrypt";

export class UserRepository implements RepositoryInterface {
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


    get = async (query: any) => {
        try {
            return this.database.usuarios.findUnique(query)

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return Promise.reject({
                    error: {
                        message: error.message,
                    }
                })

            }

            return {
                message: "Erro interno"
            }
        }
    }

    getAll = async (query: any) => {
        try {
            return await this.database.usuarios.findMany(query)
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return Promise.reject({
                    message: error.message
                })
            }
        }
    }
    //Create a new user with the body of the request
    create = async (body: any) => {
        const saltsRounds: number = 10;
        const password: string = body.password;

        const salts: any = bcript.genSaltSync(saltsRounds);
        const hashed_password: string = bcript.hashSync(password, salts);

        try {
            return await this.database.usuarios.create({
                data: {
                    nome: body.nome,
                    cpf: body.cpf,
                    email: body.email,
                    password: hashed_password,
                    cargo: body.cargo
                }
            })

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return Promise.reject({
                        error_type: "email",
                        message: `O ${error.meta?.target} já está em uso`
                    }
                    );
                }

                if (error.code === 'P2003') {
                    return Promise.reject({
                        message: `Erro ao inserir ${error.meta?.target}`
                    })
                }

                return Promise.reject({
                    message: error.message
                })
            }

            console.log(error);
            return Promise.reject({
                message: "Erro interno"
            })

        }
    }

    delete = async (query: any) => {
        try {
            return await this.database.usuarios.delete(query)
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    return Promise.reject({
                        message: "Indíce inexistente no banco de dados"
                    })
                }

                return Promise.reject({
                    message: error.message
                })

            }
            return Promise.reject({
                message: "Erro interno"
            })
        }
    }

    update = async (query: any) => {
        try {
            return await this.database.usuarios.update(query)
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return Promise.reject({
                    message: error.message
                })
            }

            return Promise.reject({
                message: "Erro interno"
            })
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
            })

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return Promise.reject({
                    message: error.message
                })

            }

            return Promise.reject({
                message: "Erro interno"
            })
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
            })

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return Promise.reject({
                    success: false,
                    message: error.message
                })
            }

            return Promise.reject({
                message: "Erro interno"
            })

        }
    }


}