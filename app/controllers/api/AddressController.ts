import { AddressRepository } from "../../repositories/AddressRepository";
import { prisma } from "../../../prisma/prisma";
import { Request, Response } from "express";

const addrRepo = new AddressRepository(prisma);

export default class AddressCotnroller {
    static addAddress = (request: Request, response: Response) => {
        addrRepo.create({
            data: {
                userAccountUserId: parseInt(request.body.userId),
                enderecoTipo: request.body.enderecoTipo,
                cep: request.body.cep,
                numero: request.body.numero,
                endereco: request.body.endereco,
                bairro: request.body.bairro,
                cidade: request.body.cidade,
                UF: request.body.uf,
                complemento: request.body.complemento,
                descricao: request.body.descricao,
            }   
        })
            .then((response: any) => {
                console.log(response)
            })
    }
}