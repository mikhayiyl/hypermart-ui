import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { makePayments } from '../../apiServices/cartsApi';
import "./style.css";
import Products from './Products';
import { getProducts } from '../../apiServices/productsApi';
import axios from 'axios';
import asyncErrors from '../../middleware/AsyncErrors';
import { currentUser } from "../../apiServices/authService";
import { cartCleared } from '../../store/cartSlice';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';


const Cart = () => {

    const { products, total, quantity } = useSelector(state => state.entities.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const [cartProducts, setProducts] = useState([]);
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    let shipping = 0;
    const currentuser = currentUser();
    let KEY = "pk_test_51MlWVqCjp3dmd8lL55WzGKcXXGL4VomC5dA9OUguDVqPL1Rno23QkEQdCJysvEFFWWVDWECxPdD8dzeTVlg5ZF7x00kcp86yOz"

    const makeOrder = async () => {
        if (!currentuser) return history('/login', { state: { from: location } });

        const { data } = await axios.post("/orders", { userId: currentuser._id, amount: total, products, address: currentuser.address });
        toast.info("success");

        dispatch(cartCleared({ clearCart: true }));



        history('/success', { state: data });


    }


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();


        const populateProducts = asyncErrors(async () => {
            const { data } = await getProducts({ cancelToken: cancelToken.token });

            //[productsIds] [products];
            if (!data) throw new Error("Products not found");

            const items = products.map(p => {
                const item = data.find(item => item._id === p.productId);
                return { ...p, image: item.image, color: item.color, sizes: item.sizes, title: item.title };

            });


            setProducts(items);

        });

        populateProducts()

        return () => {
            cancelToken.cancel();
        }

    }, [products]);


    // const getStripeToken = token => {
    //     setStripeToken(token);
    // };

    // useEffect(() => {

    //     async function checkOut() {
    //         const { data } = await makePayments({
    //             tokenId: stripeToken.id,
    //             amount: total * 100
    //         });
    //         console.log(data)
    //         history('/success', { replace: true }, { state: data });
    //     }

    //     stripeToken && checkOut()

    // }, [stripeToken, total, history]);






    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3 flex w-100 justify-content-between" >
                                <h5 className="mb-0">Cart - <span className='badge badge-pill bg-primary'>{quantity}</span> items</h5>

                                <Link to="/" className="btn btn-sm btn-success">continue shopping</Link>
                            </div>
                            <div className="card-body">
                                {cartProducts.map(product => <Products product={product} key={product.productId} />)
                                }
                            </div>
                            <hr className="my-1" />
                            {products.length > 0 && <div className="d-flex justify-content-end p-3">
                                <button className="btn btn-sm btn-danger" onClick={() => dispatch(cartCleared({ clearCart: true }))}>Clear cart</button>
                            </div>}
                        </div>



                        <div className="card mb-4">
                            <div className="card-body">
                                <p><strong>Expected shipping delivery</strong></p>
                                <p className="mb-0">12.10.2020 - 14.10.2020</p>
                            </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body">
                                <p><strong>We accept</strong></p>
                                <img src="/assets/images/pay.png" alt="pay" className="me-2" width="145px" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Products
                                        <span>${total.toFixed(2)}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Shipping
                                        <span>{shipping}</span>
                                    </li>
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>${(total + shipping).toFixed(2)}</strong></span>
                                    </li>
                                </ul>
                                {/* <StripeCheckout
                                    name='MikhayiylShop'
                                    image=''
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is ${total}`}
                                    amount={total * 100}
                                    token={getStripeToken}
                                    stripeKey={KEY}
                                >
                                </StripeCheckout> */}
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={makeOrder}>
                                    Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart;