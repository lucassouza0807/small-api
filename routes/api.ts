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
api.use("/api/auth", verifyUserRoleBeforeRequest.handle);

api.post("/api/user/create", userController.createUser);
api.put("/api/auth/user/update", userController.updateUser);
api.get("/api/auth/user/get/:cpf", userController.getUser);
api.get("/api/auth/users/get", userController.getAllUsers);
api.delete("/api/auth/user/delete/:cpf", userController.deleteUser);
api.put("/api/auth/user/block/:cpf", userController.blockUser);
api.put("/api/auth/user/unblock/:cpf", userController.unBlockUser);
//Athentication
api.post("/api/user/login", loginController.login);
api.post('/api/auth/user/logout', loginController.logout);

api.use((request: Request, response: any, next: any) => {
    response.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});