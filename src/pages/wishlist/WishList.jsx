import { Tooltip } from '@material-ui/core';
import { DeleteForeverOutlined, DeleteOutline, RemoveCircleOutline, RemoveOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { clearWishlist, getProducts, removeWishlist } from '../../apiServices/productsApi';
import { Icon } from '../../components/products/ProductStyles';
import asyncErrors from '../../middleware/AsyncErrors';
import { productAdded } from '../../store/cartSlice';


const Container = styled.div`
    height: auto;
    width: 100%;
    background-color: lightblue;
    padding: 5px;
`

const Wrapper = styled.section`
display: flex;
flex-wrap: wrap;
flex-direction: column;
`;
const Heading = styled.h3`
font-weight: 500;
text-align: center;
color: hotpink;
`
const Product = styled.article`
width: 150px;
display: flex;
justify-content: center;
align-items:center;
flex-direction:column;
box-shadow: 0 0 3px purple;
border-radius: 5px;
padding: 3px;
margin: 0.6rem;

img{
    width: 5rem;
    height: 5rem;
}
`;

const Button = styled.button`
margin: 0 auto;
`

const WishList = ({ user }) => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const location = useLocation();


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        // Fetch user's wishlist
        const getOrder = asyncErrors(async () => {
            const { data: wishlist } = await axios.get("/wishlist/" + user._id, { cancelToken: cancelToken.token });


            const { data: products } = await getProducts({ cancelToken: cancelToken.token });
            if (!wishlist) return;
            const filtered = wishlist.map(item => {
                const product = products.find(p => p._id === item.productId);
                return { ...product, _id: item._id, productId: item.productId };
            });
            setProducts(filtered);
        });

        getOrder();


        return () => {
            cancelToken.cancel();
        }



    }, []);

    const handleRemove = async (id) => {
        setProducts(products.filter(p => p._id !== id))
        await removeWishlist(id);
    };

    const handleClear = async () => {
        setProducts([]);
        await clearWishlist(user._id);
    };





    if (!user) return <Navigate to="/login" state={{ from: location }} />

    return (
        <Container>
            <Heading>WishList</Heading>

            <Wrapper>
                {products.map(product => <Product key={product._id}>
                    <img src="/assets/images/doughnut.png" alt={product.name} className="avatar" />
                    <p>{product.title}</p>
                    <span className='d-flex'>
                        <Tooltip title="add to cart">
                            <Icon onClick={() => dispatch(productAdded({ productId: product.productId, quantity: 1, size: product.sizes[0].size, color: product.color, price: product.sizes[0].price }))}>

                                <ShoppingCartOutlined />
                            </Icon>
                        </Tooltip>

                        <Tooltip title="remove">
                            <Icon onClick={() => handleRemove(product._id)}>
                                <DeleteOutline />
                            </Icon>
                        </Tooltip>
                    </span>
                </Product>)}

                <Button onClick={handleClear}>clear wishlist</Button>
            </Wrapper>
        </Container>
    )
}

export default WishList