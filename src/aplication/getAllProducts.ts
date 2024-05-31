import { ProductRepository } from "../infrastructure/productRepository"

export const productService = {
    getAllProducts: async (query: string): Promise<any> => {
        return await ProductRepository.getAllProducts(query)
    }
}
