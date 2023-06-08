import { Add, Favorite, Remove } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { productRemoved, productUpdated } from '../../store/cartSlice';

const Products = ({ product }) => {
    const dispatch = useDispatch();

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
                <p>Color: {product.color}</p>
                <p>Size: {product.size}</p>
                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                    title="Remove item"
                    onClick={() => dispatch(productRemoved({ product }))}

                >
                    <i className="fa fa-trash"></i>
                    <Remove />
                </button>
                <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                    title="Move to the wish list">
                    <i className="fas fa-heart"></i>
                    <Favorite />
                </button>
                {/* <!-- Data --> */}
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                {/* <!-- Quantity --> */}
                <div className="d-flex mb-4" style={{ maxWidth: " 300px" }}>

                    <span>

                        <button className="btn btn-warning m-1 btn-sm" onClick={() => dispatch(productUpdated({ product, quantity: -1 }))}
                            disabled={(product && product.quantity === 0)}><Remove />
                        </button>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }} className="m-1">
                        <button className="btn btn-secondary btn-sm">{product.quantity}</button>
                        <label className="form-label">Quantity</label>
                    </span>
                    <span>

                        <button className="btn btn-primary m-1 btn-sm" onClick={() => dispatch(productUpdated({ product, quantity: 1 }))}> <Add /></button>
                    </span>
                </div>
                {/* <!-- Quantity --> */}

                {/* <!-- Price --> */}
                <p className="text-start text-md-center">
                    <strong>$ {product.price} * {product.quantity || 0}</strong>
                </p>
                {/* <!-- Price --> */}
            </div>
        </div>
    )
}

export default Products