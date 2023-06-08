import { Request, Response } from "express";

export class VeryfyUserRolesBeforeRequest {

    handleCreate = async (request: Request, response: Response, next: any) => {
        const { token_payload } = request.body;

        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes("can:create");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para criar dados"
            });
        }

        return next();
    }

    handleUpdate = async (request: Request, response: Response, next: any) => {
        const { token_payload } = request.body;
        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes("can:update");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para alterar os dados"
            });
        }

        return next();

    };

    handleGet = (request: Request, response: Response, next: any) => {
        const { token_payload } = request.body;
        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes("can:read");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para ler os dados"
            });
        }

        return next();
    }

    handleDelete = (request: Request, response: Response, next: any) => {
        const { token_payload } = request.body;

        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes("can:delete");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para deletar os dados"
            });
        }

        return next();
    }

    handleBlock = (request: Request, response: Response, next: any) => {
        const { token_payload } = request.body;

        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes("can:block");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para bloquear outro usuario"
            });
        }

        return next();
    }

    handleUnBlock = (request: Request, response: Response, next: any) => {
        const { token_payload} = request.body;

        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes("can:unblock");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para desbloquear outro usuario"
            });
        }

        return next();
    }
}