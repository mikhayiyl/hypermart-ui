import { Add, Remove } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Container, ImgContainer, Img, InfoContainer, Title, Desc, Price, Wrapper, FilterContainer, Filter, FilterTitle, FilterColor, FilterSize, FilterOption, AmountContainer, Amount, Table } from "./Style";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getProduct } from '../../apiServices/productsApi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { productAdded, productUpdated } from '../../store/cartSlice';

import asyncErrors from '../../middleware/AsyncErrors';
import { CircularProgress } from '@material-ui/core';
const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);
    const [varieties, setVarieties] = useState([]);
    const [colors, setColors] = useState([]);


    const [cartProduct, setCartProduct] = useState(null);
    const { products } = useSelector(state => state.entities.cart);

    const dispatch = useDispatch();

    //get product

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        //product
        const populateProduct = asyncErrors(async () => {
            const { data: product } = await getProduct(id, { cancelToken: cancelToken.token });
            setProduct(product);

            //set initial price and size
            if (!product) return;
            setPrice(product.sizes[0].price);
            setSize(product.sizes[0].size);

            //varieties -> colors 

            const { data: varieties } = await axios.get(`/products/variety/${product._id}`, { cancelToken: cancelToken.token });
            setVarieties(varieties);
            if (!varieties) return;
            const colorsList = varieties.map(p => p.color);
            setColors(colorsList.filter(p => p.color !== (undefined || null)));

        });
        populateProduct();




        return () => {
            cancelToken.cancel();
        }

    }, [id]);

    //set price according size
    useEffect(() => {
        if (!product) return;
        const item = product.sizes.filter(s => s.size === size);
        item.length > 0 && setPrice(item[0].price);

    }, [size, product]);


    //set product by color 
    const productColor = color => {
        const product = varieties.filter(item => item.color === color);

        setProduct(product[0]);
    }

    //check if product  already in cart
    useEffect(() => {
        if (product && products) {
            const cartList = products?.filter(p => p.productId === product._id);
            setCartProduct(cartList[0]);
        }
    }, [products, product]);



    const addToCart = () => {
        //add to cart;
        dispatch(productAdded({ productId: product._id, quantity: 1, color: product.color, size, price }));
    };



    if (!product) return <Container> <CircularProgress size="5rem" /></Container>


    return (
        <main>
            <Container>
                <Wrapper>
                    <ImgContainer>
                        <Img src={product.image} alt={product.title} />
                    </ImgContainer>

                    <Table className="table table-bordered table-sm">
                        <thead>

                            <tr className='table-danger'>
                                <th>size</th>
                                <th>price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.sizes.map(s => <tr key={s._id} className='table-info'><td>{s.size}</td><td>${s.price}</td></tr>)}
                        </tbody>

                    </Table>
                    <InfoContainer>
                        <Title>{product.title}</Title>
                        <Desc>{product.description}</Desc>
                        <Price>${price}</Price>
                        <FilterContainer>
                            {colors.length > 0 && <Filter>
                                <FilterTitle>colors</FilterTitle>

                                {colors.map(c => <FilterColor key={c} color={c} onClick={() => productColor(c)} />)}

                            </Filter>}
                            <Filter>
                                <FilterSize onChange={e => setSize(e.target.value)} >
                                    <FilterTitle value={null}>Size</FilterTitle>
                                    {product.sizes.map(s => <FilterOption value={s.size} key={s._id}>{s.size}</FilterOption>)}
                                </FilterSize>
                            </Filter>

                        </FilterContainer>

                        <AmountContainer>
                            {(cartProduct && cartProduct.quantity >= 1) && <span onClick={() => dispatch(productUpdated({ productId: product._id, quantity: -1, size, price }))} className='badge badge-pill bg-warning bg-sm'>

                                <Remove />
                            </span>}

                            {(cartProduct && cartProduct.quantity >= 1) ? <button disabled className='btn btn-sm btn-secondary m-1'>      {cartProduct.quantity}

                            </button> :

                                <button onClick={addToCart} className='btn btn-primary m-1  btn-sm'>Add To Cart</button>
                            }
                            {/* <button className='btn btn-sm btn-primary'>button to cart </button> */}

                            {(cartProduct && cartProduct.quantity >= 1) && <span onClick={() => dispatch(productUpdated({ productId: product._id, quantity: 1, size, price }))} className='badge bg-info badge-pill '><Add />
                            </span>}

                        </AmountContainer>

                    </InfoContainer>

                </Wrapper>

            </Container>
        </main>
    )
}

export default Product