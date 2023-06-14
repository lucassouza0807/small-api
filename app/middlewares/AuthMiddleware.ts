import { Request, Response } from "express";

export default class AuthMiddleware {
    static handle = (request: Request, response: Response, next: any) => {
        console.log(request.session);        
        if(!request.session.user) {
            return response.redirect("/login");
        }

        return next();
    }
}