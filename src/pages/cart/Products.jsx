import { Add, Favorite, Remove } from '@material-ui/icons';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { currentUser } from '../../apiServices/authService';
import logger from '../../apiServices/logger';
import { addWishlist } from '../../apiServices/productsApi';
import asyncErrors from '../../middleware/AsyncErrors';
import { productRemoved, productAdded, colorUpdated, sizeUpdated } from '../../store/cartSlice';

const Products = ({ product }) => {


    const [colors, setColors] = useState([]);
    const [varieties, setVarieties] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        //varieties -> colors 
        const populateProduct = asyncErrors(async () => {
            if (!product) return;
            const { data: varieties } = await axios.get(`/products/variety/${product.productId}`, { cancelToken: cancelToken.token });

            //varieties -> same product different properties i.e colors,size
            setVarieties(varieties);

            //set colors
            if (!varieties) return;
            setColors(varieties.map(p => p.color));

        });
        populateProduct();


        return () => {
            cancelToken.cancel();
        }
    }, [product]);

    const updateSize = (size, price) => {

        dispatch(sizeUpdated({ productId: product.productId, size, price }));

    };


    const updateColor = color => {
        const changedProduct = varieties.find(p => p.color === color);
        dispatch(colorUpdated({ productId: product.productId, newId: changedProduct._id }));

    };


    const handleWishlist = async () => {
        const user = currentUser();

        if (!user) return toast.error("error!!, login ");

        try {
            await addWishlist(user._id, product.productId);
            toast.info("moved to wishlist");
        } catch (ex) {
            logger.log(ex);
        };

        dispatch(productRemoved({ productId: product.productId }));
    }






    return (
        <div className="row m-3 center">
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                    <img src={product.image}
                        className="product-image" alt={product.title} />
                    <a href="#!">
                        <div className="mask" style={{ backgroundColor: " rgba(251, 251, 251, 0.2)" }}></div>
                    </a>
                </div>
                {/* <!-- Image --> */}
            </div>

            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                {/* <!-- Data --> */}
                <p><strong>{product.title}</strong></p>
                {colors[0] && <div >
                    <h6 className='hcolor'>change color</h6>
                    <div className='colors'>
                        <p>Color: {product.color}</p>
                        <div className='colors'> {colors.map((c, i) =>
                            <div style={{ backgroundColor: `${c}`, }} className={product.color === c ? 'color border' : 'color'} key={i} onClick={() => updateColor(c)}>

                            </div>)}
                        </div>
                    </div >
                </div >}
                <div >
                    <h6 className='hsize'>change size</h6>
                    <div className='sizes'>
                        <p>Size:</p>
                        <div> {product.sizes.map(s => {
                            let classes = 'badge rounded-pill  text-dark m-1 ';
                            if (product.size === s.size) classes += "bg-warning";
                            else classes += "bg-light"
                            return <span className={classes} key={s._id} onClick={() => updateSize(s.size, s.price)}>{s.size}</span>
                        })}</div>
                    </div >
                </div>

                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                    title="Remove item"
                    onClick={() => dispatch(productRemoved({ productId: product.productId, }))}

                >
                    <Remove />
                </button>
                <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                    title="Move to the wish list" onClick={handleWishlist}>
                    <Favorite />
                </button>
                {/* <!-- Data --> */}
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                {/* <!-- Quantity --> */}
                <div className="d-flex mb-4" style={{ maxWidth: " 300px" }}>

                    <span>

                        <button className="btn btn-warning m-1 btn-sm" onClick={() => dispatch(productAdded({ productId: product.productId, quantity: -1, price: product.price }))}
                            disabled={(product && product.quantity === 0)}><Remove />
                        </button>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }} className="m-1">
                        <button className="btn btn-secondary btn-sm">{product.quantity}</button>
                        <label className="form-label">Quantity</label>
                    </span>
                    <span>

                        <button className="btn btn-primary m-1 btn-sm" onClick={() => dispatch(productAdded({ productId: product.productId, quantity: 1, price: product.price }))}> <Add /></button>
                    </span>
                </div>
                {/* <!-- Quantity --> */}

                {/* <!-- Price --> */}
                <p className="text-start text-md-center">
                    <strong>${product.price} * {product.quantity || 0}</strong>
                </p>
                {/* <!-- Price --> */}
            </div>
        </div>
    )
}

export default Products