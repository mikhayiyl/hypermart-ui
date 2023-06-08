import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined, ArrowLeftOutlined } from "@material-ui/icons";
import { Container, Wrapper, Slide, Desc, ImgContainer, InfoContainer, SliderArrow, Title, Image } from './SliderStyles';
import Button from '../../utilities/Button';


const Slider = ({ products }) => {
    const [randomProducts, setProducts] = useState([]);
    const [index, setIndex] = useState(0);



    //set random products
    useEffect(() => {
        let point = [...products];
        const len = point.length;
        for (let i = len - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let k = point[i];
            point[i] = point[j];
            point[j] = k
        }
        setProducts(point.slice(0, 6));
    }, [products]);

    //reset index 
    useEffect(() => {
        const lastIndex = randomProducts.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, randomProducts]);


    //auto slider
    useEffect(() => {
        let interval = setInterval(() => {
            setIndex(index + 1);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [index]);

    const handleClick = (direction) => {
        if (direction === "left") {
            setIndex(index < 0 ? randomProducts.length - 1 : index - 1);
        } else {
            setIndex(index > randomProducts.length - 1 ? 0 : index + 1)

        }
    }


    return (
        <Container>
            <SliderArrow direction="left" onClick={() => handleClick('left')}>
                <ArrowLeftOutlined />
            </SliderArrow>
            <Wrapper>
                {randomProducts.map((product, sliderIndex) => {

                    let position = "nextSlide";
                    if (sliderIndex === index) {
                        position = "activeSlide";
                    }
                    if (
                        sliderIndex === index - 1 ||
                        (index === 0 && sliderIndex === randomProducts.length - 1)
                    ) {
                        randomProducts.length > 1 ? position = "lastSlide" : position = "activeSlide";
                    }

                    return <Slide key={product._id} className={position}>
                        <ImgContainer>
                            <Image src={product.image} alt={product.image} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{product.title}</Title>
                            <Desc>{product.description.substring(0, 100,) + "..."}</Desc>
                            <Button link={`/product/${product._id}`} child="Buy Now" />
                        </InfoContainer>
                    </Slide>
                })}
            </Wrapper>

            <SliderArrow direction="right" onClick={() => handleClick('right')}>
                <ArrowRightOutlined />
            </SliderArrow>
        </Container>
    )
}

export default Slider


