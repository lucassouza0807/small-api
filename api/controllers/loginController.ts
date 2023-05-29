import { TypedRequestBody, TypedResponseBody } from "@interfaces/ExpressTypeInterface";
import { UserRepository } from "@repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginController {
    login = (request: TypedRequestBody<{ email: string, password: string }>, response: TypedResponseBody) => {
        const prisma = new PrismaClient();
        const user = new UserRepository(prisma);

        return user.get(request.body.email)
            .then(data => {
                if (data == null) {
                    response.status(200).json({
                        success: false,
                        message: "Credentials informadas não correspondem"
                    });
                }

                if (data.success == false) {
                    response.status(200).json({
                        message: data.message
                    })
                }

                const checked_password: boolean = bcrypt.compareSync(request.body.password, data.data.password);

                if (checked_password == false) {
                    response.status(401).json({
                        message: "Credenciais incorretas"
                    })
                }


                if (checked_password == true) {
                    console.log(data);
                    const user_data: any = {
                        nome: data.data.nome,
                        email: data.data.email,
                        isBlocked: data.data.isBlocked,
                        permission: data.data.role.permissions
                    }

                    const token: string = jwt.sign(user_data, `${process.env.API_SECRET}`, {
                        algorithm: "HS256"
                    });

                    response.json({
                        token: token
                    })
                }
            });

    }
}