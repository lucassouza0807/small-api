import { createClient } from "redis";
import { redisConfig } from "@utils/redis/redisCloud";
import { Request, Response } from "express";
import { prisma } from "@utils/prisma/prisma";
//express
const express = require("express");
export const api = express.Router();
//Controllers
import ProductController from "@controllers/api/ProductController";
import UserController from "@controllers/api/UserController";
//Controllers instances
const productController = new ProductController(createClient(redisConfig));
const userController = new UserController();
//Middlewares
import VerifyApiSecretBeforeRequest from "@middlewares/VerifyApiSecretBeforeRequest";
import { request } from "node:http";
//Parses body
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

//Products
api.get("/api/products", productController.getProducts.bind(productController));
api.get("/api/product/query/:name", productController.searchProductByName);
api.post("/api/product/register", productController.create);

api.post("/api/user/create", userController.create);