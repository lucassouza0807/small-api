const express = require("express");
export const api = express.Router();
//Controllers
import { UserController } from "@controllers/UserController";
import { LoginController } from "@controllers/loginController";
import { VeryfyUserRolesBeforeRequest } from "@middlewares/VerifyIfUserRolesBeforeRequestMiddleware";
import { VerifyTokenMiddleware } from "@middlewares/VerifyTokenMiddleware";

//Parses body
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

//controllers
const userController = new UserController();
const loginController = new LoginController();


//Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware();
const verifyUserRoleBeforeRequest = new VeryfyUserRolesBeforeRequest();
//Http request abd response types

api.use("/api/auth", verifyTokenMiddleware.handle);

api.post("/api/user/create", verifyUserRoleBeforeRequest.handleCreate, userController.createUser);
api.put("/api/auth/user/update", verifyUserRoleBeforeRequest.handleUpdate, userController.updateUser);
api.get("/api/auth/user/get/:cpf", verifyUserRoleBeforeRequest.handleGet, userController.getUser);
api.get("/api/auth/users/get", verifyUserRoleBeforeRequest.handleGet, userController.getAllUsers);
api.delete("/api/auth/user/delete/:cpf", verifyUserRoleBeforeRequest.handleDelete, userController.deleteUser);
api.put("/api/auth/user/block/:cpf", verifyUserRoleBeforeRequest.handleBlock, userController.blockUser);
api.put("/api/auth/user/unblock/:cpf", verifyUserRoleBeforeRequest.handleBlock, userController.unBlockUser);
//Login
api.post("/api/user/login", loginController.login);

