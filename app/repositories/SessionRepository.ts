import { Prisma } from "@prisma/client";
import { RepositoryInterface } from "@interfaces/RepositoryInterface";

export class SessionRepository implements RepositoryInterface {
    private database: any;

    constructor(database: any) {
        this.database = database;
    }

    create = async (query: Object) => {
        try {
            return await this.database.sessions.create(query);
        } catch (error: any) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(error);
            }
        }
    }

    delete = async (query: Object) => {

    }

    get = async (query: Object) => {

    }

    update = async (query: Object) => {
        try {
            return await this.database.sessions.update(query);

        } catch (error: any) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(`${error.meta?.target}\n${error}`)
                return Promise.reject({
                    message: "Erro interno"
                })
            }

            
            return Promise.reject({
                message: "Erro interno"
            })
        }
    }
}