import { Prisma } from "@prisma/client";

export class TokenRepository {
    private prisma: any;

    constructor(prisma: any) {
        this.prisma = prisma
    }

    verifyIfUserTokenIsInvalidated = async (token: string) => {
        try {
            return await this.prisma.innactiveTokens.count({
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
        await this.prisma.userTokens.create({
            data: {
                usuario_id: usuario_id,
                token: token,
                date_time: new Date().toLocaleString()
            }
        })
    }

    invalidateUserToken = async (token: string, user_id: number) => {
        return await this.prisma.create({
            data: {
                token: token,
                user_id: user_id,
                date_time: new Date().toLocaleString()

            }
        })
    }
}