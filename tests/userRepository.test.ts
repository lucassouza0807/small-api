import { describe, expect, test } from '@jest/globals';
import { UserRepository } from "../api/repositories/UserRepository";
import { prisma } from "../prisma/prisma";

const userRepo = new UserRepository(prisma);

test("Test if querie returns correct data by mock", async () => {
    const data = await userRepo.get("lucas@gmail.com");

    const userMock: any =
    {
        "usuario_id": 22,
        "nome": "Lucas",
        "cpf": "450.235.708-19",
        "email": "lucas@gmail.com",
        "cargo": "Lider",
        "password": "$2b$10$Ll5/FGQJhCojooSoBxRh.OBUDw0tLSCoveCgEO8ZITbx3hsuuP6UG",
        "role_id": 1,
        "isActive": true,
        "isBlocked": false,
        "role": {
            "role_id": 1,
            "role": "lider",
            "permissions": "can:read, can:update, can:create, can:delete"
        }
    }

    expect(data).toStrictEqual(userMock);


})

test("test return data correctly", async () => {
    const data = await userRepo.getAll()

    expect(data).not.toBe(undefined || null || "")
})

test("Test delete data", () => {
     
})