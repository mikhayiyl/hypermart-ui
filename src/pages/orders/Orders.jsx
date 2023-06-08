import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import asyncErrors from '../../middleware/AsyncErrors';
import { mobile } from "../../utilities/Responsive";


export const Container = styled.div`
    width: 100%;
    height: auto;
    background: rgba(0, 0, 0, 0.25);

`
export const Title = styled.h3`
 text-align: center;
    font-weight: 400;
    color: darkblue;
`
const OrdersWrap = styled.div`
width: 100%;
    display: flex;
    flex-wrap: wrap;


    ${mobile({ justifyContent: "center" })}

`
export const Order = styled.div`
    width: fit-content;
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

        p{
            font-weight: 400;
            font-size: 0.8rem;
        }
`

export const Span = styled.span`
    color: rgb(81, 70, 70);  
    font-weight: 500;
`



const Orders = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const location = useLocation();


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        // Fetch user's order history using an API call
        const getOrders = asyncErrors(async () => {


            const { data } = await axios.get("/orders/myorders/" + user._id, { cancelToken: cancelToken.token });
            setOrders(data);
        });

        getOrders();

        return () => {
            cancelToken.cancel();
        }
    }, [user])

    if (!user) return <Navigate to="/login" state={{ from: location }} />


    return (
        <Container>
            <Title >Order History</Title>
            <OrdersWrap >
                {orders.map(order => (
                    <Order key={order._id}>
                        <p><Span>Order ID:</Span> {order._id}</p>
                        <p><Span>Date:</Span> {format(order.createdAt)}</p>
                        <p><Span>Total:</Span> {order.amount}</p>

                        <Link className='Color' to={`/order/${order._id}`} >
                            <button className={order.status}>View Details</button>
                        </Link>
                    </Order>
                ))}
            </OrdersWrap>
        </Container>
    )
}

export default Orders;