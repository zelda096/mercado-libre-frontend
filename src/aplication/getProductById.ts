import { ProductRepository } from "../infrastructure/productRepository"

export const productDetailService = {
    getProductById: async (id: string): Promise<any> => {
        return await ProductRepository.getProductDetailById(id)
    }
}