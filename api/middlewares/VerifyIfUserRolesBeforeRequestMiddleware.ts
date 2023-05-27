import { TypedRequestBody, TypedResponseBody } from "../interfaces/ExpressTypeInterface";

export class VeryfyUserRolesBeforeRequest {

    handleCreate = async (request: TypedRequestBody<{ roles: any }>, response: TypedResponseBody, next: any) => {
        const roles = request.token_payload.roles;

        const userHasPermission: boolean = roles.includes("can:create");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para criar dados"
            });
        }

        return next();
    }

    handleUpdate = async (request: TypedRequestBody<{ roles: any }>, response: TypedResponseBody, next: any) => {
        const roles = request.token_payload.roles;

        const userHasPermission: boolean = roles.includes("can:update");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para alterar os dados"
            });
        }

        return next();

    };

    handleGet = (request: TypedRequestBody<{ roles: any }>, response: TypedResponseBody, next: any) => {
        const roles = request.token_payload.roles;

        const userHasPermission: boolean = roles.includes("can:read");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para ler os dados"
            });
        }

        return next();
    }

    handleDelete = (request: TypedRequestBody<{ roles: any }>, response: TypedResponseBody, next: any) => {
        const roles = request.token_payload.roles;

        const userHasPermission: boolean = roles.includes("can:delete");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para deletar os dados"
            });
        }

        return next();
    }

    handleBlock = (request: TypedRequestBody<{ roles: any }>, response: TypedResponseBody, next: any) => {
        const roles = request.token_payload.roles;

        const userHasPermission: boolean = roles.includes("can:block");

        if (userHasPermission == false) {
            return response.status(401).json({
                message: "O usuario não tem permissão para bloquear outro usuario"
            });
        }

        return next();
    }
}