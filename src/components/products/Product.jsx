import { Circle, Icon, Image, Info, ProductContainer } from './ProductStyles';
import { ShoppingCartOutlined, SearchOutlined, FavoriteBorderOutlined } from "@material-ui/icons"
import { Link } from 'react-router-dom';
import { productAdded } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Tilt from 'react-vanilla-tilt';
import { addWishlist } from '../../apiServices/productsApi';
import { currentUser } from '../../apiServices/authService';
import { toast } from 'react-toastify';
import logger from '../../apiServices/logger';


const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        //set initial price and size
        if (!product) return;
        setPrice(product.sizes[0].price);
        setSize(product.sizes[0].size);
        setColor(product.color);

    }, [product]);


    const user = currentUser();

    const handleWishlist = async () => {
        if (!user) return toast.error("error!!, login ");
        try {
            await addWishlist(user._id, product._id);
            toast.info("added to wishlist");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.success("already in wishlist");
            }

            logger.log(ex);
        }
    }

    return (
        <Tilt options={{ max: 40, speed: 1000, }} style={{ width: "auto", height: "auto" }}>
            <div>      <ProductContainer>
                <Circle />
                <Image src={product.image} />
                <Info>
                    <Icon onClick={() => dispatch(productAdded({ productId: product._id, quantity: 1, size, color, price }))}>
                        <ShoppingCartOutlined />
                    </Icon>
                    <Link to={`/product/${product._id}`}>
                        <Icon>
                            <SearchOutlined />
                        </Icon>
                    </Link>
                    <Icon onClick={handleWishlist}>
                        <FavoriteBorderOutlined />
                    </Icon>
                </Info>
            </ProductContainer>
            </div>

        </Tilt >
    )
}

export default Product