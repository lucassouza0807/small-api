import { RepositoryInterface } from "@interfaces/RepositoryInterface";
import { Prisma, PrismaClient } from "@prisma/client";
import ProductArgsInterface from "@interfaces/ProductArgsInterface";
import { logger } from "@utils/logs/logger";
import { errors } from "@messages/pt-BR/errors";

export default class ProductRepository implements RepositoryInterface {
    public database: PrismaClient;

    constructor(database: PrismaClient) {
        this.database = database;
    }

    async getAll(args: ProductArgsInterface) {
        const { page = 1, take = 20, sort = "price" } = args;
        try {

            const [data, total] = await this.database.$transaction([
                this.database.products.findMany({
                    select: {
                        name: true,
                        description: true,
                        specifications: true,
                        imageCover: true,
                        images: true,
                        category: true,
                        subCategory: true,
                    },
                    skip: (Number(page) - 1) * Number(take),
                    take: Number(take)
                }),

                this.database.products.count()
            ]);

            const totalPages = Math.ceil(total / Number(take));

            return { data, total, totalPages }

        } catch (error: any) {
            const date = new Date().toLocaleString();
            
            logger.error(`[${date}]: ${error.message}.\n`);

            return {
                error: {
                    message: errors.GENERIC
                }
            }


        }

    }

    async get(name: string, args: ProductArgsInterface) {

        const { page = 1, take = 20, sort = "price" } = args;

        try {
            const [results, total] = await this.database.$transaction([
                this.database.products.findMany({
                    select: {
                        price: true,
                        name: true,
                        description: true,
                        specifications: true,
                        imageCover: true,
                        images: true,
                        category: true,
                        subCategory: true,
                    },
                    take: Number(take),
                    skip: (Number(page) - 1) * Number(take),
                    where: {
                        name: {
                            search: name
                        }
                    }
                }),

                this.database.products.count({
                    where: {
                        name: {
                            search: name
                        }
                    }
                })
            ]);

            const totalPages = Math.ceil(total / Number(take));

            return { results, total, totalPages }

        } catch (error: any) {
            const date = new Date().toLocaleString();
            logger.error(`[${date}]: ${error.message}.\n`)
        }
    }

    async create(args: ProductArgsInterface) {
        const { fields } = args;
        try {

            await this.database.products.create({
                data: {
                    name: String(fields?.name),
                    price: Number(fields?.price),
                    quantity: Number(fields?.quantity),
                    description: String(fields?.description),
                    specifications: JSON.stringify(fields?.specifications),
                    images: String(fields?.images),
                    imageCover: String(fields?.imageCover),
                    categoryId: String(fields?.categoryId),
                    subCategoryId: String(fields?.subCategoryId)
                }
            })

            return {
                success: true
            }

        } catch (err: any) {

        }

    }

    async update(productId: string, args: ProductArgsInterface) {
        const { fields } = args;

        await this.database.products.update({
            data: {
                name: String(fields?.name),
                price: Number(fields?.price),
                quantity: Number(fields?.quantity),
                description: String(fields?.description),
                specifications: JSON.stringify(fields?.specifications),
                images: String(fields?.images),
                imageCover: String(fields?.imageCover),
                categoryId: String(fields?.categoryId),
                subCategoryId: String(fields?.subCategoryId)
            },
            where: {
                productId: productId
            }
        })
    }

    delete(query: Object) {

    }
}