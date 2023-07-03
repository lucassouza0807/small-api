import ProductArgsInterface from "@interfaces/ProductArgsInterface";

export interface RepositoryInterface {
    create(query: ProductArgsInterface): any
    delete(query: ProductArgsInterface): any
    update(id: string, args: ProductArgsInterface): any
    get(name: string, args: ProductArgsInterface): any
}