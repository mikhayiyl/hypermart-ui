import React from 'react'
import { ProductsContainer } from '../products/ProductStyles'
import Card from './Card'

const Cards = ({ products }) => {




    return (
        <ProductsContainer>
            {products.slice(0, 6).map(product => <Card key={product._id} product={product} />)}
        </ProductsContainer>
    )
}

export default Cards