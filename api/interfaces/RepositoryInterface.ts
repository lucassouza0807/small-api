import { TypedResponseBody } from "./ExpressTypeInterface"

export interface RepositoryInterface {
    get(body: any, resp: any): Express.Response
    create(body: any, resp: TypedResponseBody): Express.Response
    delete(body: any, resp: TypedResponseBody): Express.Response
    update(body: any, resp: TypedResponseBody): Express.Response
}