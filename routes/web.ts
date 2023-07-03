const express = require("express");
export const web = express.Router();
import { Request, Response } from "express";
import { prisma } from "@utils/prisma/prisma";

web.get("/register-product-in-stock", async (request: Request, response: Response) => {
    const [category, subCategory]: any = await prisma.$transaction([
        prisma.category.findMany(),
        prisma.subCategory.findMany()
    ]);

    return response.render("register-product.ejs", {
        category: category,
        subCategory: subCategory
    })
})