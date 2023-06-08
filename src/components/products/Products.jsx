import { useState, useEffect } from 'react'
import Product from './Product'
import { ProductsContainer } from './ProductStyles'
const Products = ({ path, sort, filters, products }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    //filter colors and sizes

    useEffect(() => {
        let filtered = [...products];

        if (filters.color && !filters.size) {
            filtered = filtered.filter(p => p.color === filters.color);

        } else if (filters.size && !filters.color) {
            filtered = products.filter(p => p.sizes.some(i => i.size === filters.size));


        } else if (filters.size && filters.color) {
            filtered = products.filter(p => (p.sizes.some(i => i.size === filters.size) && p.color === filters.color));
        }

        setFilteredProducts(filtered);





    }, [path, products, filters]);



    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt));
        } else if (sort === 'asc') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.sizes[0].price - b.sizes[0].price));
        } else {

            setFilteredProducts(prev => [...prev].sort((a, b) => b.sizes[0].price - a.sizes[0].price));
        }
    }, [sort])



    return (
        <ProductsContainer>
            {path ? filteredProducts.map(product => <Product key={product._id} product={product} />) : products.map(product => <Product key={product._id} product={product} />)}
        </ProductsContainer>
    )
}

export default Products