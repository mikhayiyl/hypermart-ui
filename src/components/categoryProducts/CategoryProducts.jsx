import React, { useEffect, useState } from 'react';
import asyncErrors from "../../middleware/AsyncErrors";
import axios from "axios";
import { Container, HorizontalSLider, Image, Price, Wrapper, LinkR, Buy } from '../categories/CategoriesStyles';

const CategoryProducts = ({ category }) => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const populateProducts = asyncErrors(async () => {
            const { data } = await axios("/products", { cancelToken: cancelToken.token });
            const filtered = data.filter(product => product.category._id === category._id);
            setProducts(filtered);


        });

        populateProducts()

        return () => {
            cancelToken.cancel();
        }

    }, [category._id]);




    return (
        <Wrapper>
            {products.length > 0 && <div>
                <h2>{category.name}</h2>
                <HorizontalSLider>
                    {products.slice(0, 5).map(product => <Product key={product._id} product={product} />)}
                </HorizontalSLider>
                <LinkR to={`/category/${category._id}`}>see more</LinkR>
            </div>}
        </Wrapper>
    )
}

export default CategoryProducts;




const Product = ({ product }) => {



    return (
        <>
            <Container to={`/product/${product._id}`}>
                <Price>{product.title}</Price>
                <Image src={product.image} alt={product.title} />
                <Price>$ {product.price}</Price>
                <Buy className="badge bg-pill bg-primary">Buy now</Buy>
            </Container>
        </>
    )
};
