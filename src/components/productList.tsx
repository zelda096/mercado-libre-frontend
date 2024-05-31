import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHookstate } from '@hookstate/core'
import SearchBox from './searchBox'
import { useNavigate } from "react-router-dom"
import { productService } from '../aplication/getAllProducts'
import { Item } from '../core/domain/entities'
import '../styles/productList.scss'


const ProductList: React.FC = () => {
    const products = useHookstate<Item[]>([])
    const categories = useHookstate<string[]>([])
    const location = useLocation()
    const inputQuery = new URLSearchParams(location.search).get('search')
    const inputString = JSON.stringify(inputQuery)
    const navigate = useNavigate()

    const getproducts = async (): Promise<void> => {
        try {
            const response = await productService.getAllProducts(inputString)
            products.set(response.items)
            categories.set(response.categories)
        } catch (error) {
            console.error('Error fetching search products:', error)
        }
    }

    useEffect(() => {
        if (inputQuery) {
            getproducts()
        }
    }, [inputQuery])

    const onProductClick = (id: string): void => {
        navigate(`/items/${id}`)
    }

    return (
        <>
            <SearchBox />
            <div className="product-list-container">
                <div className="content">
                    <h2 className="categories">{categories.get().join(' | ')}</h2>
                    <ul>
                        {products.get().map((item: Item) => (
                            <li key={item.id} className="product-item" onClick={() => onProductClick(item.id)}>
                                <img src={item.picture} alt={item.title} />
                                <div className="product-info">
                                    <p className="price">${item.price.amount}</p>
                                    <p className="title">{item.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ProductList
