//express
const express = require("express");
export const api = express.Router();
//Controllers
import AddressCotnroller from "@controllers/api/AddressController";
import ProductController from "@controllers/ProductController";
//Middlewares
import VeryfyUserRolesBeforeRequest from "@middlewares/VerifyIfUserRolesBeforeRequestMiddleware";
import VerifyTokenMiddleware from "@middlewares/VerifyTokenMiddleware";

//Parses body
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use("/api/auth", VerifyTokenMiddleware.handle);

//Routes

//Products
api.get("/api/products", ProductController.paginateProducts);
api.get("api/product/search/:product", ProductController.paginateProducts);

//user address
api.post("/api/auth/user/address/add", AddressCotnroller.addAddress);