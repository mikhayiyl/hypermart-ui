import styled from 'styled-components';
import { mobile } from "../../utilities/Responsive";

export const Container = styled.div`
width: 100%;
height: 400px;
display: flex;
justify-content: center;
align-items:center;
padding: 1em;
position: relative;
${mobile({ padding: "0" })};

`

export const Wrapper = styled.div`
width: 100%;
height: 100%;
position: relative;
`
export const Slide = styled.div`
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 100%;
 background: radial-gradient( yellow,pink);
  display:flex;
  align-items: center;
  justify-content: center;
  transition: 1s all ease-in-out;
  border-radius:15px;
  overflow: hidden;
  padding: 5px;
  ${mobile({ flexDirection: 'column' })}

`
export const SliderArrow = styled.div`
width: 50px;
height: 50px;
background-color:#567888;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position:absolute;
cursor: pointer;
top: 0;
bottom: 0;
z-index: 2;
left:${props => props.direction === "left" && "10px"};
right:${props => props.direction === "right" && "10px"};
margin:auto;
opacity:0.5;
`

export const ImgContainer = styled.div`
flex:50%;
height: 1000px;
width: 100%;
background: radial-gradient( chocolate,violet);
clip-path:polygon(0 0,0 100%,100% 49%);
display:flex;
justify-content: center;
align-items: center;
overflow:auto;
${mobile({ height: "100%", clipPath: "none" })}
`

export const Image = styled.img`
width: 70%;
object-fit: contain;
z-index: 30;
${mobile({ width: "50%" })}
`

export const InfoContainer = styled.div`
flex:50%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
text-align: center;
height: 100%;
padding: 0.5em;
`
export const Title = styled.h2`
font-size: clamp(1.5rem, calc(5vw + 1rem), 3rem);
font-weight: 400;
width: 100%;
height: 150px;
text-transform: capitalize;
${mobile({ height: "auto", marginBottom: "20px" })}

`
export const Desc = styled.span`
margin:20px 0;
font-size: 15px;
font-weight: 500;
letter-spacing:1px;
`
