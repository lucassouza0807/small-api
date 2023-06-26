const express = require("express");
export const web = express.Router();
import { Request, Response } from "express";
//Controllers
import LoginController from "../app/controllers/LoginController";

//Middlewares
import AuthMiddleware from "../app/middlewares/AuthMiddleware";
import GuestMiddleware from "../app/middlewares/GuestMiddleware";

web.get("/", (request: Request, response: Response) => {
    response.render("auth/login.ejs", {
        error: null,
    });
})

web.get("/login", GuestMiddleware.handle, (request: Request, response: Response) => {
    return response.render("auth/login.ejs", {
        error: null,
        message: null,
    });
});

web.get("/cadastro", (request: Request, response: Response) => {
    return response.render("auth/register.ejs", {
        error: null,
        old_input: null
    })
});

web.get("/dashboard", AuthMiddleware.handle, (request: Request, response: Response) => {
    return response.render("auth/dashboard.ejs", {
        user: request.session.user
    });
});
