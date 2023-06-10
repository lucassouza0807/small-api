import { Prisma } from "@prisma/client";

export class TokenRepository {
    private database: any;

    constructor(database: any) {
        this.database = database
    }

    verifyIfUserTokenIsInvalidated = async (token: string) => {
        try {
            return await this.database.innactiveTokens.count({
                where: {
                    token: token
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    message: "Server error"
                }
            }

            else {
                console.log(error)
            }
        }

    }
    registerUserToken = async (token: string, usuario_id: string) => {
        await this.database.userTokens.create({
            data: {
                usuario_id: usuario_id,
                token: token,
                date_time: new Date().toLocaleString()
            }
        })
    }

    invalidateUserToken = async (token: string, user_id: number) => {
        try {
            return await this.database.innactiveTokens.create({
                data: {
                    token: token,
                    usuario_id: user_id,
                    date_time: new Date().toLocaleString()
                }
            })
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return Promise.reject({
                    code: error.code,
                    message: error.message,
                    field: error.meta?.target
                })
            }

            return Promise.reject("Erro interno")
        }

    }
}