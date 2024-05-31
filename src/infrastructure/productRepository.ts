import { IProductRepository } from "../aplication/productRepository"
import { ProductDetails } from "../core/domain/entities"
import { ProductResponse } from "../core/domain/entities"

const localhost = "http://localhost:3001/"

export const ProductRepository: IProductRepository = {
  async getAllProducts(query: string): Promise<ProductResponse[]> {
    const response = await fetch(`${localhost}api/items?q=${query}`, {
      method: "GET",
    })
    const data = await response.json()
    return data
  },

  async getProductDetailById(id: string): Promise<ProductDetails> {
    const response = await fetch(`${localhost}api/items/${id}`, {
      method: "GET",
    })
    const data = await response.json()
    return data
  },
}
