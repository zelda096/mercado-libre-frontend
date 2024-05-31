import { ProductDetails } from '../core/domain/entities'
import { ProductResponse } from '../core/domain/entities'

export type IProductRepository = {
    getAllProducts(query: string): Promise<ProductResponse[]>
    getProductDetailById(id: string): Promise<ProductDetails>
}


