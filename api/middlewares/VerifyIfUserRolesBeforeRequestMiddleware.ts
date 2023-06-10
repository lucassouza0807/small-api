import { Request, Response } from "express";

export class VeryfyUserRolesBeforeRequest {

    handle = async (request: Request, response: Response, next: any) => {
        const { itention, token_payload }: any = request.body;

        const url: string = request.path.toString();

        if (!itention) {
            return response.status(400).json({
                message: "Erro: não conseguimos prosseguir com a requisição sem saber suas intenções"
            })
        }

        if (url.match(itention) === null) {
            return response.status(400).json({
                message: "ERRO: a ação não confere com a ação real do controller"
            });
        }

        const roles = token_payload.permission;

        const userHasPermission: boolean = roles.includes(`can:${itention}`);

        if (userHasPermission == false) {
            return response.status(401).json({
                message: `ERRO: o usuario não tem a permissão para seguinte ação: ${itention}`
            });
        }

        return next();

    }

}