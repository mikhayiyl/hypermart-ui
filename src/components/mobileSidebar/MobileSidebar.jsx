import { Event, Favorite, Group, RecentActors, VideoLibrary, SaveOutlined, ShopOutlined, ShoppingBasket, Watch, Computer, Home, PhoneAndroid } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./style.scss"
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: ${({ scroll }) => (scroll ? 'fixed' : 'absolute')};
  top: ${({ scroll }) => (scroll ? '30px' : '80px')};
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 50;
  visibility: visible;
  visibility: ${({ mobileBurger }) => (mobileBurger ? 'visible' : 'hidden')};

`




const MobileSidebar = ({ onToggle, mobileBurger }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const changeNav = () => {
      if (window.scrollY >= 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", changeNav);

    return () => window.removeEventListener("scroll", changeNav);
  }, []);



  return (
    <Container mobileBurger={mobileBurger} scroll={scroll} onClick={onToggle} className='sidebarContainer'>
      <ul className={mobileBurger ? "open sidebarMenu " : "sidebarMenu"} >
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className='sidebarMenu_link'
            onClick={onToggle}

            to='categories/supermarket'
          >
            <ShoppingBasket className='margin' />
            Supermaket
          </NavLink>
        </li>

        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/fashion"
          >
            <Watch className='margin' />
            Fashion
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/computing"
          >
            <Computer className='margin' />
            computing
          </NavLink>
        </li>

        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/electronics"
          >
            <SaveOutlined className='margin' />
            Electronics
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/home&office"
          >
            <Home className='margin' />
            Home & Office
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/phones&tablets"
          >
            <PhoneAndroid className='margin' />
            Phones & Tablets
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/grocery"
          >
            <PhoneAndroid className='margin' />
            Grocery
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="categories/health&beauty"
          >
            <PhoneAndroid className='margin' />
            Health & Beauty
          </NavLink>
        </li>

      </ul>
    </Container>
  );
};

export default MobileSidebar;
