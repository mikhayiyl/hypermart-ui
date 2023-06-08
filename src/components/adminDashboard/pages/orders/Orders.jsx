import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./order.css";
import { getProducts, createProduct } from "../../../../apiServices/productsApi";
import asyncErrors from "../../../../middleware/AsyncErrors";
import { getUser } from "../../../../apiServices/userService";
import removeEmptyValues from "../../../../utilities/RemoveKeys";
import { format } from "timeago.js";
import logger from "../../../../apiServices/logger";

const Orders = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});
    const [user, setUser] = useState({ address: {} });
    const { id } = useParams();

    useEffect(() => {

        const cancelToken = axios.CancelToken.source();

        const populateProducts = asyncErrors(async () => {
            //order
            const { data: order } = await axios.get("/orders/" + id);
            setOrder(order);

            //customer
            const { data: user } = await getUser(order.userId);

            setUser(user);

            // fetch products
            const { data: products } = await getProducts({ cancelToken: cancelToken.token });

            //ordered products
            const items = order.products.map(p => {
                const item = products.find(product => product._id === p.productId);
                if (item) {
                    return { ...item, quantity: p.quantity };
                } else {
                    return { ...p };
                }
            });

            setProducts(items);

        });
        populateProducts();

        return () => {
            cancelToken.cancel();
        };
    }, [id]);


    const processOrder = async (products) => {
        await Promise.all(
            products.map(product => {
                const obj = {
                    _id: product._id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    size: product.size,
                    color: product.color,
                    price: product.price,
                    sex: product.sex,
                    numberInStock: product.numberInStock,
                    categoryId: product.category._id,

                };

                //remove undefined /empty properties
                removeEmptyValues(obj);

                //update number inStock;
                //update order from pending to approved;


                return createProduct({ ...obj, numberInStock: obj.numberInStock - product.quantity }).then(axios.put("/orders/" + id, { status: "approved" }).then(window.location.reload()).catch((ex) => logger.log(ex))

                );


            })
        );

    }
    const declineOrder = (id) => {
        axios.put("/orders/" + id, { status: "declined" }).then(res => console.log(res));
        window.location.reload();
    }
    const cancelOrder = (products) => {
        Promise.all(
            products.map(product => {
                const obj = {
                    _id: product._id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    size: product.size,
                    color: product.color,
                    price: product.price,
                    sex: product.sex,
                    numberInStock: product.numberInStock,
                    categoryId: product.category._id,

                };

                //remove undefined /empty properties
                removeEmptyValues(obj);

                //update number inStock;
                //update order from pending to approved;


                return createProduct({ ...obj, numberInStock: obj.numberInStock + product.quantity }).then(axios.put("/orders/" + id, { status: "pending" }).then(window.location.reload()).catch((ex) => logger.log(ex)))



            })
        );

    }





    return (
        <div className="order">

            <div className="userTitleContainer">
                <h1 className="userTitle">Order </h1>
                <small className={order.status}>Status: {order.status}</small>
            </div>
            <div className="orderContainer">
                <div className="customer">
                    <div className="userShowTop">
                        <img
                            src={user.image} alt={user.username}
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.username}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{(user.isAdmin && "Admin") || (user.isStaff && "Staff") || "Customer"}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{format(user.createdAt)}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.address.phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.address.location}</span>
                        </div>
                    </div>
                </div>
                <div className="orderProducts">
                    <h2 className="userUpdateTitle">Products</h2>
                    <table className="table table-bordered table-sm" >
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Stock</th>
                                <th>quantity</th>
                                <th>view</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                products.map(product => <tr key={product._id}>

                                    <td>
                                        <div className="productListItem">
                                            <img className="productListImg" src={product.image} alt={product.image} />
                                            {product.title}
                                        </div>
                                    </td>
                                    <td>{product.numberInStock}</td>
                                    <td>{product.quantity}</td>
                                    <td><Link to={"/admin/products/" + product._id} className={product.numberInStock < product.quantity ? "btn btn-sm btn-danger" : "btn btn-sm btn-success"}>
                                        view
                                    </Link></td>
                                </tr>)}
                        </tbody>
                    </table>

                </div>
            </div>
            {(order.status === "pending" || order.status === "declined") && <button className="btn btn-sm btn-info m-1" onClick={() => processOrder(products)}>Process order</button>}

            {order.status === "pending" && <button className="btn btn-sm btn-warning m-1" onClick={() => declineOrder(id)}>Decline order</button>}

            {order.status === "approved" && <button className="btn btn-sm btn-danger m-1" onClick={() => cancelOrder(products)}>Cancel order</button>}
        </div>
    );
}

export default Orders