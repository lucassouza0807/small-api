import { RepositoryInterface } from "@interfaces/RepositoryInterface";
import { prisma } from "@prisma/prisma";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import { redisConfig } from "@utils/redis/redisCloud";

export default class ProductRepository implements RepositoryInterface {
    private database: any;

    constructor(database: any) {
        this.database = database;
    }

    async paginate(params: any) {
        const { page } = params;

        try {

            const data = await prisma.products.findMany({
                take: 10,
                skip: (page == 1) ? 0 : (page - 1) * 10
            })

            const total = await prisma.products.count();

            const totalPages = Math.ceil(total / 10);

            return { data, total, totalPages }

        } catch (error: any) {
            return {
                message: 'Desculpe estamos enfrentano problemas internos'
            }
        }

    }
    async get(query: Object) {
        try {
            return await this.database.products.findUnique(query)
        } catch (error: any) {
            return {
                message: "Erro interno"
            }
        }
    }
    update(query: Object) { }
    delete(query: Object) { }
    create(query: Object) { }
}