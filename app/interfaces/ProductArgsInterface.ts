export default interface ProductArgsInterface {
    name?: string,
    page?: number,
    take?: number,
    sort?: string,
    productId?: string,
    fields?: {
        name?: string | undefined,
        price?: number | undefined,
        description?: string | undefined,
        quantity?: number,
        specifications?: string,
        imageCover?: string,
        images?: string[],
        categoryId?: string,
        subCategoryId?: string

    }
}
