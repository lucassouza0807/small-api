import { query } from "express";

export class AddressRepository {
    private database: any;

    constructor(database: any) {
        this.database = database;
    }

    get = async (query: Object) => {
        try {
            return await this.database.endereco.findUnique(query)

        } catch (error: any) {
            if (error) {
                console.log(error);
            }
        }

    }

    create = async (query: Object) => {
        try {
            return await this.database.endereco.create(query)

        } catch (error: any) {
            if (error) {
                console.log(error);
            }
        }

    }

    delete = async (query: Object) => {
        try {
            return await this.database.endereco.delete(query);

        } catch (error: any) {

            return Promise.reject({
                message: "Erro interno"
            });

        }
    }
}