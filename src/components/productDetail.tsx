import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHookstate } from '@hookstate/core'
import SearchBox from './searchBox'
import { ProductDetails } from '../core/domain/entities'
import { productDetailService } from '../aplication/getProductById'
import '../styles/productDetail.scss'

const ProductDetail: React.FC = () => {
    const { id } = useParams()
    const product = useHookstate<ProductDetails | null>(null)
    const categoryOfProduct = useHookstate<string[]>([])

    useEffect(() => {
        if (id) {
            getProductDetailById()
        }
    }, [id])

    const getProductDetailById = async (): Promise<void> => {
        try {
            const response = await productDetailService.getProductById(`${id}`)
            product.set(response.item.item)
            categoryOfProduct.set(response.item.categories)
        } catch (error) {
            console.error('Error fetching product details:', error)
        }
    }

    return (
        <>
            <SearchBox />
            <div className="container">
                <h2>{categoryOfProduct.get().slice(-1)[0]}</h2>
                <div className="product-detail-container">
                    <div className="product-detail">
                        <img src={product.get()?.picture} alt={product.get()?.title} />
                        <div className="product-info">
                            <div className="condition-sold">
                                <p className="condition">{product.get()?.condition}</p>
                                <p className="sold-quantity"> - Vendidos {product.get()?.sold_quantity === undefined ? 0 : product.get()?.sold_quantity}</p>
                            </div>
                            <h1>{product.get()?.title}</h1>
                            <p className="price">${product.get()?.price.amount}.{product.get()?.price.decimals}</p>
                            <a href='https://www.mercadolibre.com.co/' target="_blank">
                                <button className="buy-button">Comprar</button>
                            </a>
                        </div>
                    </div>
                    <div className="description">
                        <h1>Descripción del producto</h1>
                        <p >{product.get()?.description}</p>
                    </div>
                </div>
            </div>

        </>

    )
}

export default ProductDetail
