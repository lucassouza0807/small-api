const express = require("express");
export const notFoundHandler = express.Router();
import { Request, Response } from "express";

//handles not found routes
notFoundHandler.route("*")
    .get((request: Request, response: Response) => {
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
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })
    .options((request: Request, response: Response) => {
        return response.status(404).json({
            message: "Recurso não disponível"
        })

    })

