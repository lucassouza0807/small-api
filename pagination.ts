import { prisma } from "@utils/prisma/prisma";

async function t() {
    const cur_page: number = 0;
    
    const query = await prisma.products.findMany({
        take: 10,
        skip: 0 ,
        where: {
            productName: {
                contains: "rtx",
            },
        }
    });

    const paginate = query[9];

    console.log(query)

}

console.log(t());