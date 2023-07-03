import ProductRepository from "@repositories/ProductRepository";
import { Request, Response } from "express";
import { prisma } from "@utils/prisma/prisma";
import { RedisClientType } from "redis";
import { logger } from "@utils/logs/logger";

const productRepo = new ProductRepository(prisma);

export default class ProductController {

    private redisClient: RedisClientType;

    constructor(redis: RedisClientType) {
        this.redisClient = redis
    }

    async create(request: Request, response: Response) {

        const { body } = request;

        const { success, error }: any = await productRepo.create({
            fields: body
        });

        if (error) {
            return response.status(400).json({
                message: error.message
            })
        }

        return response.status(200).json({
            message: success
        });

    }

    async searchProductByName(request: Request, response: Response) {
        logger.info("Socorro\n");

        this.redisClient
            .connect()
            .catch(console.error)

        const { pageSize, page, sort }: any = request.query;
        const { name } = request.params;

        const { results, total, totalPages, error }: any = await productRepo.get(name, {
            page: page || 1,
            take: pageSize || 20,
            sort: sort || "price:desc",
        })

        if (error) {
            return response.json({
                message: error.message
            })
        }

        return response.json({
            results,
            total: total,
            totalPages: totalPages
        })

    }


    async getProducts(request: Request, response: Response) {
        logger.info("Socorro\n");

        this.redisClient
            .connect()
            .catch(console.error);

        const { pageSize, page, sort }: any = request.query;
        const redisQuery = `productsPagination_page=${page || 1}_take=${pageSize || 10}_sortBy=${sort}`;

        const cachedResults: any = await this.redisClient.hGet(redisQuery, "data");

        if (cachedResults == null) {

            const { data, total, totalPages, error }: any = await productRepo
                .getAll({
                    page: page,
                    take: pageSize,
                    sort: sort
                });

            if (error) {
                return response.status(400).json({
                    message: error.message
                })
            }

            const dataObject = JSON.stringify({
                data,
                total: total,
                totalPages: totalPages
            })

            await this.redisClient.hSet(
                redisQuery, "data",
                dataObject
            );

            await this.redisClient.expire(redisQuery, (60 * 60 * 2)); //2 Hours to expire

            await this.redisClient.disconnect();

            return response.json(JSON.parse(dataObject));

        }

        await this.redisClient.disconnect();

        return response.json(JSON.parse(cachedResults));

    }

}