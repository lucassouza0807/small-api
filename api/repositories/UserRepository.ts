import { Prisma } from "@prisma/client";
import { RepositoryInterface } from "@interfaces/RepositoryInterface";
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


    get = async (email: string) => {
        try {
            return await this.database.usuarios.findUnique({
                include: {
                    role: true
                },
                where: {
                    email: email,
                }
            })

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    message: error.message
                }

            }

            return {
                message: "Erro interno"
            }
        }
    }

    getAll = async () => {
        try {
            return await this.database.usuarios.findMany({
                select: {
                    email: true,
                    nome: true,
                    cargo: true,
                    role: {
                        select: {
                            permissions: true,
                            role: true

                        }
                    }
                }
            })
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: error.message
                }
            }

            throw error

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
                    return {
                        success: false,
                        message: `O ${error.meta?.target} já está em uso`
                    }
                }

                if (error.code === 'P2003') {
                    return {
                        success: false,
                        message: `Erro ao inserir ${error.meta?.target}`
                    }
                }
            } else {
                //Handles with not 
                return {
                    message: error.message
                }
            }

            throw error;
        }
    }

    delete = async (email: string) => {
        try {
            return await this.database.usuarios.delete({
                where: {
                    email: email
                }
            })
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    return {
                        success: false,
                        message: "Indíce inexistente no banco de dados"
                    }
                }

            }
            return {
                message: "Erro interno"
            }
        }
    }

    update = async (body: any) => {
        if (!body) {
            return {
                message: "Precisa de ao menos um campo para atualizar os dados"
            }
        }
        try {
            return await this.database.usuarios.update({
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
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: error.message
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
            })

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: error.message
                }
            }

            return {
                message: "Erro interno"
            }
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
                return {
                    success: false,
                    message: error.message
                }
            }

            return {
                message: "Erro interno"
            }

        }
    }


}