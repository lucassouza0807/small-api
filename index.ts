require("dotenv").config();
//Server config
const express = require("express");
const app = express();

//Controllers
import { UserController } from "@controllers/UserController";
const userController = new UserController();
import { LoginController } from "@controllers/loginController";
const loginController = new LoginController();
//Parses body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middlewares
import { VerifyTokenMiddleware } from "./api/middlewares/VerifyTokenMiddleware";
const verifyTokenMiddleware = new VerifyTokenMiddleware();
import { VeryfyUserRolesBeforeRequest } from "./api/middlewares/VerifyIfUserRolesBeforeRequestMiddleware";
const verifyUserRoleBeforeRequest = new VeryfyUserRolesBeforeRequest();
//Http request abd response types
import { TypedRequestBody, TypedResponseBody } from "./api/interfaces/ExpressTypeInterface";

/**
 * Express does not suport route grouping nativelly 
 * then the lines below can be a bit to long to read
 * because of the middlewares arguments
 * Always the last argument will be the controller
 **/

//User context
app.post("/api/user/create", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleCreate, userController.createUser);
app.put("/api/user/update", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleUpdate, userController.updateUser);
app.get("/api/user/get/:cpf", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleGet, userController.getUser);
app.get("/api/users/get", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleGet, userController.getAllUsers);
app.delete("/api/user/delete/:cpf", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleDelete, userController.deleteUser);
app.put("/api/user/block/:cpf", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleBlock, userController.blockUser);
app.put("/api/user/unblock/:cpf", verifyTokenMiddleware.handle, verifyUserRoleBeforeRequest.handleBlock, userController.unBlockUser);

//App login context
app.post("/api/user/login", loginController.login);
app.post("/api/user/logout", (request: any, response: any) => { });

//Ticket context

//handles not found routes
app.route("*")
    .get((request: Express.Request, response: TypedResponseBody) => {
        return response.status(404).json({
            message: "Rota não econtrada"
        })

    })
    .put((request: Express.Request, response: TypedResponseBody) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })
    .delete((request: Express.Request, response: TypedResponseBody) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })
    .post((request: Express.Request, response: TypedResponseBody) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })
    .options((request: Express.Request, response: TypedResponseBody) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })

app.listen(process.env.DEV_PORT, () => {
    console.log(`${process.env.DEV_URL}:${process.env.DEV_PORT}`);
})