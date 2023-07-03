import { Prisma } from "@prisma/client";
import { errors } from "@messages/pt-BR/errors";

export default class UserRepostoty {
    private database: any;

    constructor(database: any) {
        this.database = database;
    }

    async create({ data }: any) {
        try {
            await this.database.user.update({
                data: {
                    name: data.name,
                    cpf: data.cpf,
                    image: data.image || undefined,
                    data_nasc: data.data_nasc,
                    tel_celular: data.tel_celular,
                    tel_fixo: data.tel_fixo,
                    Address: {
                        create: {
                            identificacao: data.identificacao,
                            cep: data.cep,
                            numero: data.numero,
                            endereco: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.cidade,
                            estado: data.uf,
                            complemento: data.complemento,
                            descricao: data.descricao,
                            referencia: data.referencia || undefined
                        },
                    },
                },
                where: {
                    email: data.email
                }
            })

            return {
                success: true,
            }

        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == "2002") {
                    return {
                        error: {
                            message: `O campo ${error?.meta} já está em uso`
                        }
                    }
                }

                this.database.logs.create({
                    data: {
                        logLevel: "CRITICAL",
                        message: `${error.message}\n`
                    }
                })

                return {
                    error: {
                        message: errors.SERVER_DOWN
                    }
                }
            }

            return {
                error: {
                    message: errors.SERVER_DOWN
                }
            }
        }
    }
}