const express = require("express");
export const web = express.Router();
import { Request, Response } from "express";
//Controllers
import LoginController from "@controllers/LoginController";
import UserController from "@controllers/UserController";

//Middlewares
import AuthMiddleware from "@middlewares/AuthMiddleware";
import GuestMiddleware from "@middlewares/GuestMiddleware";

web.get("/", (request: Request, response: Response) => {
    response.render("home.ejs");
})

web.get("/login", GuestMiddleware.handle, (request: Request, response: Response) => {
    return response.render("auth/login.ejs", {
        error: null,
        message: null,
    });
});

web.get("/cadastro", (request: Request, response: Response) => {
    return response.render("auth/register.ejs", {
        error: null
    })
});

web.get("/dashboard", AuthMiddleware.handle, (request: Request, response: Response) => {
    return response.render("auth/dashboard.ejs", {
        user: request.session.user
    });
});


web.post("/register", UserController.create);
web.post("/logout", LoginController.logout);
web.post("/login", LoginController.login);