import styled from "styled-components";
import Slider from '../Slider/Slider';
import { NavLink } from 'react-router-dom';
import { ComputerOutlined, EmojiObjectsOutlined, FitnessCenterOutlined, HelpOutline, HomeOutlined, LocalFloristOutlined, MoneyOutlined, PhoneAndroidOutlined, RepeatOneOutlined, ShoppingBasketOutlined, WatchOutlined } from "@material-ui/icons";
import { ipad, mobile } from "../../utilities/Responsive";



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
overflow: hidden;
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





const Index = ({ products }) => {
    return (
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
            <MiddleBar>
                <Slider products={products} />
            </MiddleBar>
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
    )
}
export default Index;
