import styled from "styled-components";
import { mobile } from "../../utilities/Responsive";


export const Container = styled.div`
background: #444;
width: 100%;
height: auto;
position: fixed;
top:30px;
position: ${({ scroll }) => (scroll ? 'fixed' : 'sticky')};

z-index:200;
`
export const Nav = styled.nav`
box-shadow:  inset 0px 0px 1px #000000;

`

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
position: relative;
justify-content: space-between;
height: auto;
padding: 5px;

`

export const SideMenu = styled.div`
float: left;
overflow: hidden;

`
export const SideMenuUl = styled.div`
 position: absolute;
  background-color: #f9f9f9;
  border-radius: 5px;
  min-width: 200px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 110;
`

export const Center = styled.div`
display:flex;
align-items: center;
justify-content: space-between;

`
export const Logo = styled.h1`
font-weight:400;
font-style: italic;
color: violet;
${mobile({ fontSize: '24px' })}

`



export const MenuItem = styled.div`
display: flex;
list-style: none;
margin-left: 1.3rem;

${mobile({ fontSize: "12px", marginLeft: "10px" })}

`

export const MobileIcon = styled.div`
display: none;
    height: 40px;
    width: 40px;
    cursor: pointer;
    margin-left: 2px;

    ${mobile({ display: "block" })}

`;


export const Burger = styled.div`
 position: absolute;
  top:20px;
   width: 34px;
   height: 6px;
   border-radius: 10px;
   background: #000;
   transition: all 0.5s ease-in-out;

   &::before {
     content: "";
     position: absolute;
     top: -10px;
     width: 34px;
     height: 6px;
     border-radius: 10px;
     background: #000;
   }

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    width: 25px;
    height: 6px;
    border-radius: 10px;
    background: #000;
  }

   &.open {
     transform: rotate(-720deg);
     background: transparent;

     &::before {
       transform: rotate(45deg) translate(8px, 8px);
     }

     &::after {
       width: 34px;
       transform: rotate(-45deg) translate(6px, -7px);
     }
   }
 `;



export const UserProfile = styled.div`
 float: right;
overflow: hidden;

`
export const UserMenu = styled.ul`
   position: absolute;
   right: 0;
  background-color: #f9f9f9;
  border-radius: 5px;
  min-width: 170px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 110;
  margin: 0 ;
  padding: 0;
  padding:3px;
  
 
`

export const MenuList = styled.li`
 
    list-style: none;
    margin:0 5px;
    padding: 2px;
    margin: 3px;
    cursor: pointer;
    transition:0.3s ease;
    
    a{
    color: black;
   width:90%;
  text-decoration: none;
  font-weight: 300;
  font-size: 1.2rem;

  transition: all 400ms ease;
&:hover{
    margin-left:1rem ;
}

  }
`
export const XS = styled.div`
display: block;
width: 50%;
${mobile({ display: "none" })}

`
export const MD = styled.div`
display: none;
${mobile({ display: "block" })}

`