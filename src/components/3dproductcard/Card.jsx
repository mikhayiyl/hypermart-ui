import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { currentUser } from '../../apiServices/authService';
import logger from '../../apiServices/logger';
import { addWishlist } from '../../apiServices/productsApi';
import { productAdded } from '../../store/cartSlice';
import { Icon } from '../products/ProductStyles';


const ProductLink = styled(Link)`
   color: #000;
   &:hover {
     color: #000;
   }
`;
const Icons = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
 position: absolute;
    bottom: 0;
    left: 50%;
    transform-style: preserve-3d;
    transform: translate3d(-50%, 0, 75px);
    transition: 0.5s;
    z-index: 10;
    opacity:0;
`
const Circle = styled.div`
position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transition: 0.5s;
    transform-style: preserve-3d;
    transform: translate3d(-50%, -50%, 50px);
    opacity: 1;
    background: #fff;
    z-index: 10;
`


const Title = styled.h2`
 position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    color: #fff;
    text-shadow: 0 0 3px red, 0 0 5px blue;
    width: 100%;
    transform-style: preserve-3d;
    transform: translate3d(0, 0, 75px);
    opacity: 0;
    z-index: 10;
    transition: 0.5s ease-in-out;
`
const Container = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transform-style: preserve-3d;
  overflow: hidden;
`
const Box = styled.div`
 position: relative;
    width: 300px;
    height: 400px;
    margin: 40px;
    background: #232323;
    background:rgba(0, 0, 5, 0.5);
    border-radius: 20px;
    transform-style: preserve-3d;

    &::before {
      content: "NIKE";
      position: absolute;

      top: 30px;
      left: 20px;
      font-size: 6em;
      font-weight: 900;
      color: #fff;
      opacity: 0;
      font-style: italic;
      transition: 0.5s ease-in;
    }

    &::after {
      content: "SHOES";
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 5em;
      font-weight: 900;
      color: #fff;
      opacity: 0;
      font-style: italic;
      transition: 0.5s ease-in;
    }

    //product-box hover
    &:hover {
      &::before,
      &::after {
        opacity: 0.04;
      }

      ${Title} {
        top: 40px;
        opacity: 1;
      }

      ${Icons} {
        bottom: 30px;
        opacity: 1;
      }
    }

    &:nth-child(1) {
      ${Circle} {
        background: #379bf7;
      }
    }
    &:nth-child(2) {
      ${Circle} {
        background: #9bdc28;
      }
    }
    &:nth-child(3) {
      ${Circle} {
        background: #fb4b4f;
      }
    }

`


const Image = styled.img`
 position: absolute;
    top: 50%;
    left: 50%;
    height: 35%;
    transition: 0.5s;
    z-index: 11;
    transform-style: preserve-3d;
    transform: translate3d(-50%, -50%, 50px);
`


const Card = ({ product }) => {
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

  const handleWishlist = async () => {
    const user = currentUser();

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

  const dispatch = useDispatch();
  return (
    <Container >
      <Box >
        <Title >{product.title}</Title>
        <Icons>
          <Icon onClick={() => dispatch(productAdded({ productId: product._id, quantity: 1, size, price, color }))
          }>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <ProductLink to={`/product/${product._id}`}>
              <SearchOutlined />
            </ProductLink>
          </Icon>
          <Icon onClick={handleWishlist}>
            <FavoriteBorderOutlined />
          </Icon>
        </Icons>
        <Circle ></Circle>
        <Image src={product.image} alt={product.title} />
      </Box>
    </Container>
  )
}

export default Card