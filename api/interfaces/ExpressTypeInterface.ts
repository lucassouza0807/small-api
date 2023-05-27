export interface TypedRequestBody<T> extends Express.Request {
    body: T,
    params: T,
    headers: T
    route: T
    token_payload: T
}

export interface TypedResponseBody extends Express.Response {
    status: any,
    json: any
}
