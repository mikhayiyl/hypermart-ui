import styled from "styled-components";
import { NavLink, useLocation } from 'react-router-dom';
import { ComputerOutlined, EmojiObjectsOutlined, FitnessCenterOutlined, HelpOutline, HomeOutlined, LocalFloristOutlined, MoneyOutlined, PhoneAndroidOutlined, RepeatOneOutlined, ShoppingBasketOutlined, WatchOutlined } from "@material-ui/icons";
import { ipad, mobile } from "../../utilities/Responsive";
import { useEffect } from "react";
import { useState } from "react";
import { Category } from "../../components/categories/Categories";
import axios from "axios";
import asyncErrors from "../../middleware/AsyncErrors";
import CategoryProducts from "../../components/categoryProducts/CategoryProducts";
import Cards from "../../components/3dproductcard/Cards";
import { getProducts } from "../../apiServices/productsApi";



const Container = styled.div`
display: flex;
`
const Icon = styled.span`
margin: 0 0.4em;
`
const LeftBar = styled.div`
flex: 20%;
padding: 0.5em;

${mobile({ display: "none" })}
`
const MiddleBar = styled.div`
flex: 60%;
display: flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;

p{
font-weight: 500;
font-size: 1rem;
padding: 0.5rem;
text-shadow: 0 0 3px red,0 0 5px yellow;
}


`
const Ul = styled.ul`
      margin: 0;
    padding: 0.3em;
    list-style: none;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px #111;
`
const Li = styled.li`
 margin:0.5em 0;   
`
const Link = styled(NavLink)`
text-decoration: none;
color:#000;
font-size: 14px;
font-weight: 400;
transition: all 400ms ease;
&:hover{
    margin-left:1rem ;
}

`

const RightBar = styled.div`
padding: 0.5em;
flex: 20%;
${ipad({ display: "none" })}

        a{
            font-size: 1rem;
        }
        
    

`

const Categories = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2].substring(0, 4).toUpperCase();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();


        const populateCategories = asyncErrors(async () => {
            const { data } = await axios.get("/categories", { cancelToken: cancelToken.token });

            const filtered = data.filter(item => item.genre.name.startsWith(path) && !item.name.startsWith(path));
            setCategories(filtered);
        });

        populateCategories();

        const populateProducts = asyncErrors(async () => {
            const { data } = await getProducts({ cancelToken: cancelToken.token });

            const filtered = data.filter(item => item.category.genre.name.startsWith(path));
            setProducts(filtered);
        });

        populateProducts();


        return () => {
            cancelToken.cancel();
        }
    }, [path]);

    return (<>
        <Container>
            <LeftBar>
                <Ul  >
                    <Li >
                        <Link

                            to="/categories/supermarket"
                        >
                            <Icon>
                                <ShoppingBasketOutlined />
                            </Icon>
                            Supermaket
                        </Link>
                    </Li>

                    <Li >
                        <Link

                            to="/categories/fashion"
                        ><Icon>
                                <WatchOutlined />
                            </Icon>
                            Fashion
                        </Link>
                    </Li>
                    <Li >
                        <Link
                            to="/categories/computing"
                        ><Icon><ComputerOutlined /></Icon>
                            computing
                        </Link>
                    </Li>

                    <Li >
                        <Link
                            to="/categories/electronics"
                        ><Icon>
                                <EmojiObjectsOutlined />
                            </Icon>
                            Electronics
                        </Link>
                    </Li>
                    <Li >
                        <Link



                            to="/categories/home&office"
                        ><Icon>
                                <HomeOutlined />
                            </Icon>
                            Home & Office
                        </Link>
                    </Li>
                    <Li >
                        <Link
                            to="/categories/phones&tablets"
                        ><Icon><PhoneAndroidOutlined /></Icon>
                            Phones & Tablets
                        </Link>
                    </Li>
                    <Li >
                        <Link



                            to="/categories/grocery"
                        ><Icon>
                                <LocalFloristOutlined />
                            </Icon>
                            Grocery
                        </Link>
                    </Li>
                    <Li >
                        <Link
                            to="/categories/health&beauty"
                        ><Icon>
                                <FitnessCenterOutlined />
                            </Icon>
                            Health & Beauty
                        </Link>
                    </Li>

                </Ul>
            </LeftBar>
            {categories.length >= 0 ? <MiddleBar>
                {categories.map(category => <Category category={category} key={category._id} />)}
            </MiddleBar> : <MiddleBar>
                <p>We are very sorry!.Items out of Stock.Come back later .Thank You </p>
            </MiddleBar>}
            <RightBar>
                <Ul>
                    <Li><Link to=''><Icon><HelpOutline /></Icon> Help & support</Link>
                    </Li>
                    <Li><Link to=''><Icon><RepeatOneOutlined /></Icon>Return</Link>
                    </Li>
                    <Li><Link to=''>
                        <Icon>
                            <MoneyOutlined /></Icon>
                        Sell with us</Link>
                    </Li>
                </Ul>
            </RightBar>
        </Container>
        {categories.map(category => <CategoryProducts category={category} key={category._id} />)}
        <Cards products={products} />

    </>
    )
}

export default Categories;