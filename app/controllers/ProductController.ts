import { prisma } from "@prisma/prisma";
import ProductRepository from "@repositories/ProductRepository";
import { Request, Response } from "express";
import { createClient } from "redis";
import { redisConfig } from "@utils/redis/redisCloud";

const productRepo = new ProductRepository(prisma);

export default class ProductController {
    static async paginateProducts(request: Request, response: Response) {
        const redisClient = createClient(redisConfig);
        redisClient.connect().catch(console.error);

        const { page } = request.query;

        const chachedResults: any = await redisClient.get(`productsPagination_page=${(page) ? page : 1}`);

        if (chachedResults == null) {
            const { page } = request.query;

            const { data, total, totalPages }: any = await productRepo.paginate({ page: (page) ? page : 1 });

            await redisClient
                .set(`productsPagination_page=${(page) ? page : 10}`, JSON.stringify({
                    data,
                    total: total,
                    totalPages: totalPages,
                }));

            await redisClient.disconnect();

            return response.json({
                data: data,
                total: total,
                totalPages: totalPages
            })
        }

        await redisClient.disconnect();
        return response.json({
            data: JSON.parse(chachedResults)
        });
    }

}