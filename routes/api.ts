//express
const express = require("express");
export const api = express.Router();
//Controllers
import UserApiController from "../app/controllers/api/UserApiController";
import LoginApiController from "../app/controllers/api/LoginApiController";
//Middlewares
import VeryfyUserRolesBeforeRequest from "../app/middlewares/VerifyIfUserRolesBeforeRequestMiddleware";
import VerifyTokenMiddleware from "../app/middlewares/VerifyTokenMiddleware";

//Parses body
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use("/api/auth", VerifyTokenMiddleware.handle);
api.use("/api/auth", VeryfyUserRolesBeforeRequest.handle);

//Routes
api.post("/api/user/create", UserApiController.createUser);
api.put("/api/auth/user/update", UserApiController.updateUser);
api.get("/api/auth/user/get/:cpf", UserApiController.getUser);
api.get("/api/auth/users/get", UserApiController.getAllUsers);
api.delete("/api/auth/user/delete/:cpf", UserApiController.deleteUser);
api.put("/api/auth/user/block/:cpf", UserApiController.blockUser);
api.put("/api/auth/user/unblock/:cpf", UserApiController.unBlockUser);
//Athentication
api.post("/api/user/login", LoginApiController.login);
api.post('/api/user/logout', LoginApiController.logout);
