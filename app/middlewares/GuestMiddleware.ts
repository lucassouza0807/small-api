import { Request, Response } from "express";

export default class GuestMiddleware {
    static handle(request: Request, response: Response, next: any) {
        if(request.session.user) {
            return response.redirect("/dashboard");
        }

        return next();
    }
}