import ProductRepository from "../../app/repositories/ProductRepository"
const ProductRepo = new ProductRepository();

const mock = [{
    productId: 'clj92ib8i0000f5glnnu6zht0',
    productName: 'RTX 3050 0',
    productCategory: 'VGA',
    productPrice: 2000,
    productDescription: 'Placa de video muito boa',
    productSpecifications: 'Tem video',
    productImages: '/rtx1.png'
}]

describe("Test Product Repo", () => {

    test("e", async () => {
        const { products, total, totalPages } = await ProductRepo.paginate({ page: 1, take: 1 })
        expect(products).toStrictEqual(mock);
    })

})