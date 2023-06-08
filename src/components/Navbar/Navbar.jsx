import { useEffect, useState } from 'react';
import { Avatar, Badge, Tooltip } from "@material-ui/core";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Watch, Computer, LockOutlined, FavoriteBorderOutlined } from "@material-ui/icons";
import {
    AccountBoxOutlined,
    DashboardOutlined, EmojiObjectsOutlined,
    FitnessCenterOutlined,
    HomeOutlined, LocalFloristOutlined,
    LockOpenOutlined,
    Menu,
    PersonOutline, PersonOutlineOutlined, PhoneAndroidOutlined, ShoppingBasketOutlined, ShoppingCartOutlined
} from "@material-ui/icons";
import { Container, Wrapper, Center, Logo, MenuItem, MobileIcon, Burger, UserMenu, Nav, UserProfile, SideMenu, SideMenuUl, MenuList, XS, MD } from './NavbarStyles';
import { getProducts } from "../../apiServices/productsApi";
import asyncErrors from "../../middleware/AsyncErrors";
import SearchBar from "./SearchBar";


const Navbar = ({ setOpen, isOpen, openned, setOppened, closeAll, user, setModalOpen, modalOpen }) => {
    const { quantity } = useSelector(state => state.entities.cart);
    const [scrollNav, setScrollNav] = useState(false);
    const [searchedData, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState("");
    const location = useLocation();
    const path = location.pathname === "/" || location.pathname.split("/")[1] === "categories";


    function clearFilters() {
        setFilters("");
        setData([])
    }



    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const populateCategories = asyncErrors(async () => {
            const { data } = await axios.get("/categories", { cancelToken: cancelToken.token });
            setCategories(data);
        });

        populateCategories();

        const populateProducts = asyncErrors(async () => {
            const { data: products } = await getProducts({ cancelToken: cancelToken.token });
            setProducts(products)
        });
        populateProducts();


        return () => {
            cancelToken.cancel();
        }

    }, []);




    useEffect(() => {

        const filteredproducts = products.filter(p => p.title.toLowerCase().startsWith(filters.toLowerCase()));
        const filteredCategories = categories.filter(c => c.name.toLowerCase().startsWith(filters.toLowerCase()));
        //merge searches to one array
        const mergeItems = filteredproducts.concat(filteredCategories);

        setData(filters ? mergeItems : []);

    }, [filters, products, categories]);






    useEffect(() => {
        const changeNav = () => {
            if (window.scrollY >= 30) {
                setScrollNav(true);
            } else {
                setScrollNav(false);
            }
        };

        window.addEventListener("scroll", changeNav);

        return () => window.removeEventListener("scroll", changeNav);
    }, []);






    return (
        <Container scroll={scrollNav}>
            <Nav className={scrollNav ? "sticky  bg-light h-auto" : " bg-light h-auto"}>
                <Wrapper>
                    <Center >

                        <SideMenu onClick={() => setOppened(false)}>
                            {!path &&
                                <XS>
                                    <Tooltip title="menu list">
                                        <Menu onClick={() => setOpen(!isOpen)} className="icon" />
                                    </Tooltip>
                                </XS>
                            }
                            <Tooltip title="open menu">
                                <MobileIcon onClick={() => setOpen(!isOpen)} >
                                    {isOpen ? <Burger className="open" /> : <Burger />}
                                </MobileIcon>
                            </Tooltip>

                            {isOpen && <SideMenuUl onClick={closeAll}>
                                <MenuList><NavLink to='/'><HomeOutlined className='mx-1' />
                                    Home</NavLink></MenuList>
                                <MenuList><NavLink to='categories/supermarket'><ShoppingBasketOutlined className='mx-1' />
                                    Supermaket</NavLink></MenuList>
                                <MenuList><NavLink to="categories/fashion"
                                >
                                    <Watch className='mx-1' />
                                    Fashion
                                </NavLink></MenuList>
                                <MenuList><NavLink to="categories/computing"
                                >
                                    <Computer className='mx-1' />
                                    computing
                                </NavLink></MenuList>
                                <MenuList><NavLink to="categories/electronics"
                                >                                <EmojiObjectsOutlined className='mx-1' />

                                    Electronics</NavLink></MenuList>
                                <MenuList><NavLink to="categories/home&office"
                                >
                                    <HomeOutlined className='mx-1' />
                                    Home & Office</NavLink></MenuList>
                                <MenuList><NavLink to="categories/phones&tablets"
                                >
                                    <PhoneAndroidOutlined className='mx-1' />
                                    Phones & Tablets</NavLink></MenuList>
                                <MenuList><NavLink to="categories/grocery"
                                >
                                    <LocalFloristOutlined className='mx-1' />
                                    Grocery</NavLink></MenuList>
                                <MenuList><NavLink to="categories/health&beauty"
                                >
                                    <FitnessCenterOutlined className='mx-1' />
                                    Health & Beauty</NavLink></MenuList>
                            </SideMenuUl>}

                        </SideMenu>

                        <MenuItem>
                            <NavLink to='/' className="link" onClick={() => { setOppened(false); setOpen(false) }}>
                                <Logo>HYPERMART</Logo>
                            </NavLink>
                        </MenuItem>
                        <XS>

                            <SearchBar clearFilters={clearFilters} setFilters={setFilters} searchedData={searchedData} />
                        </XS>


                        <MenuItem>
                            <NavLink to='/cart'>
                                <Badge overlap='rectangular' badgeContent={quantity} color='primary'>
                                    <ShoppingCartOutlined />
                                </Badge>
                            </NavLink>
                        </MenuItem>
                        <UserProfile onClick={() => setOpen(false)}>
                            <Tooltip title={openned ? "" : "Open settings"} onClick={() => setOppened(!openned)}>
                                {true ? <Avatar alt="Remy Sharp" src="/assets/profile/disha.jpg" className='icon' /> : <PersonOutline />}
                            </Tooltip>
                            {openned && <UserMenu onClick={closeAll}>

                                <MenuList>
                                    <NavLink to='profile'>
                                        <PersonOutlineOutlined className='mx-1' />Profile
                                    </NavLink>
                                </MenuList>
                                <MenuList>
                                    <NavLink to='orders'><ShoppingBasketOutlined className='mx-1' />My orders</NavLink>
                                </MenuList>
                                <MenuList>
                                    <NavLink to='wishlist'><FavoriteBorderOutlined className='mx-1' />Wishlist</NavLink>
                                </MenuList>
                                <MenuList>{!user ?
                                    <NavLink to={location.pathname} onClick={() => setModalOpen(!modalOpen)}><LockOpenOutlined className='mx-1' />Login
                                    </NavLink> :
                                    <NavLink to='logout'><LockOutlined className='mx-1' />Logout
                                    </NavLink>}
                                </MenuList>
                                {(user && user.isAdmin) &&
                                    <MenuList>
                                        <NavLink to='admin'><DashboardOutlined className='mx-1' />Dashboard</NavLink>
                                    </MenuList>}
                            </UserMenu>}
                        </UserProfile>


                    </Center>
                    <MD>

                        <SearchBar clearFilters={clearFilters} setFilters={setFilters} searchedData={searchedData} />

                    </MD>
                </Wrapper>
            </Nav>

        </Container >

    )
}

export default Navbar






