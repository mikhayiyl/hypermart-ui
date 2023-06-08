import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { Span, Title } from './Orders';
import { getProducts } from "../../apiServices/productsApi";
import asyncErrors from '../../middleware/AsyncErrors';


const Container = styled.div`
    width: 100%;
    height: 400px;
    background: rgba(0, 0, 0, 0.25);
    overflow:hidden;
    padding: 3px;

    
    `
const Box = styled.div`
    width: 300px;
    padding: 15px;
    margin: 20px;
    border-radius: 10px;
    background-color:rgba(255,255,255,0.15);
    backdrop-filter:blur(25px);
     border: 8px solid #223243;
        box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.35),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        inset 5px 5px 15px rgba(0, 0, 0, 0.35);

    `
const Order = () => {
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        // Fetch user's order history using an API call
        const getOrder = asyncErrors(async () => {
            const { data: order } = await axios.get("/orders/" + id);
            setOrder(order);


            const { data: products } = await getProducts({ cancelToken: cancelToken.token });
            if (!order) return;
            const filtered = order.products.map(item => {
                const product = products.find(p => p._id === item.productId);
                return { ...item, image: product.image, name: product.title }
            });
            setProducts(filtered);
        });

        getOrder();


        return () => {
            cancelToken.cancel();
        }



    }, []);




    return (
        <Container>
            <Title>My Order</Title>
            <Box>
                <p><Span>Id:</Span> {order._id}</p>
                <p><Span>Status:</Span> {order.status}</p>
                <p><Span>Amount Paid: </Span>{order.amount}</p>
                <p><Span>Date ordered:</Span> {format(order.createdAt)}</p>
            </Box>
            <Title>Items Ordered</Title>
            <table className='table table-success table-bordered table-sm'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => <tr key={product._id}>
                        <td>
                            <img src={product.image} alt={product.name} className="avatar" />
                            {product.name}
                        </td>
                        <td>{product.quantity}</td>
                        <td>{product.size}</td>
                        <td>{product.color}</td>
                    </tr>)}
                </tbody>
            </table>
        </Container>
    )
}

export default Order;