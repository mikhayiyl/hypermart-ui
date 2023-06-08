import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makePayments } from '../../apiServices/cartsApi';
import "./style.css";
import Products from './Products';
import axios from 'axios';
import { currentUser } from "../../apiServices/authService"


const Checkout = () => {
    const { products, total, quantity } = useSelector(state => state.entities.cart);

    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();
    let shipping = 0;


    const getStripeToken = token => {
        setStripeToken(token);
    };

    useEffect(() => {
        async function checkOut() {
            const { data } = await makePayments({
                tokenId: stripeToken.id,
                amount: total * 100
            });

            history('/success', { replace: true }, { state: data });
        }

        stripeToken && checkOut()

    }, [stripeToken]);


    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Cart - {quantity} items</h5>
                            </div>
                            <div className="card-body">
                                {products.map(product => <Products product={product} key={product._id} />)
                                }


                                <hr className="my-4" />

                                {/* <!-- Single item --> */}
                                <div className="row">
                                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp"
                                                className="w-100" alt="image" />
                                            <a href="#!">
                                                <div className="mask" style={{ backgroundColor: " rgba(251, 251, 251, 0.2)" }}></div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                                    alt="PayPal acceptance mark" />
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
                                        <span>${total}</span>
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
                                        <span><strong>${total + shipping}</strong></span>
                                    </li>
                                </ul>
                                {/* <StripeCheckout 
                            name='MikhayiylShop'
                            image=''
                            billingAddress
                            shippingAddress
                            description={`Your total is ${total}`}
                            amount={total *100}
                            token={getStripeToken}
                            stripeKey={KEY}
                            >

                            </StripeCheckout> */}
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => console.log(1)}>
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

export default Checkout;