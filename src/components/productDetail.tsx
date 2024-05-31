import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHookstate } from '@hookstate/core'
import SearchBox from './searchBox'
import { ProductDetails } from '../core/domain/entities'
import { productDetailService } from '../aplication/getProductById'
import '../styles/productDetail.scss'
import ImageComponent from './productImg'

const ProductDetail: React.FC = () => {
    const { id } = useParams()
    const product = useHookstate<ProductDetails | null>(null)
    const categoryOfProduct = useHookstate<string[]>([])

    useEffect(() => {
        const getProductDetailById = async (): Promise<void> => {
            try {
                const response = await productDetailService.getProductById(`${id}`)
                product.set(response.item.item)
                categoryOfProduct.set(response.item.categories)
            } catch (error) {
                console.error('Error fetching product details:', error)
            }
        }

        if (id) {
            getProductDetailById()
        }
    }, [id, product, categoryOfProduct])



    return (
        <main>
            <SearchBox />
            <section className='product-container'>
                <p className="category-of-product">{categoryOfProduct.get().slice(-1)[0]}</p>
                <article className="product-detail-container">
                    <div className="description">
                        <ImageComponent url={product.get()?.picture || ''} />
                        <div>
                            <h2>Descripción del producto</h2>
                            <p>{product.get()?.description}</p>
                        </div>
                    </div>
                    <aside className="product-detail">
                        <div className="condition-sold">
                            <span className="condition">{product.get()?.condition}</span>
                            <span className="sold-quantity"> - {product.get()?.sold_quantity === undefined ? 0 : product.get()?.sold_quantity} vendidos</span>
                        </div>
                        <span className='name-product'>{product.get()?.title}</span>
                        <div className="price-container">
                            <span className="price">${product.get()?.price.amount.toLocaleString()}</span>
                            <span className="decimals">{product.get()?.price.decimals}</span>
                        </div>
                        <a href='https://www.mercadolibre.com.co/' target="_blank" rel="noreferrer">
                            <button className="buy-button">Comprar</button>
                        </a>
                    </aside>
                </article>
            </section>

        </main>

    )
}

export default ProductDetail
