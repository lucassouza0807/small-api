const express = require("express");
export const notFoundHandler = express.Router();
import { Request, Response } from "express";

notFoundHandler.route("*")
    .get((request: Request, response: Response) => {
        const { path } = request;

        if (path.match(/api/) === null) {
            return response.render("404.ejs");
        }

        return response.status(404).json({
            message: "Rota não econtrada"
        })

    })
    .put((request: Request, response: Response) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })
    .delete((request: Request, response: Response) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })
    .post((request: Request, response: Response) => {
        const { path } = request;

        if (path.match(/api/)) {
            return response.status(404).json({
                message: "Recurso não disponível"
            })
        }

    })

