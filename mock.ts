import { prisma } from "./app/utils/prisma/prisma";

async function addCategory(category: string) {
    return await prisma.category.create({
        data: {
            category: category
        }
    })
}

async function addSubCategory(category: string) {
    return await prisma.subCategory.create({
        data: {
            subCategory: category,
            
        }
    })
}

addCategory("hardwares")
    .then(() => console.log("Success"))
    .catch((error: any) => console.log(error))