export interface RepositoryInterface {
    create(query: Object): any
    delete(query: Object): any
    update(query: Object): any
    get(query: Object): any
}