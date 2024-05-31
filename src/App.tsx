import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from './components/productList'
import SearchBox from './components/searchBox'
import ProductDetail from './components/productDetail'
import './App.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/items" element={<ProductList />} />
        <Route path="/items/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default App
