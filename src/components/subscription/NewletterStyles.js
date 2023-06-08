import styled from "styled-components";
import { mobile } from "../../utilities/Responsive";

export const Container = styled.div`
height: 60vh;
background-color:#fc35f5 ;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 0.3rem;
`
export const Desc = styled.span`
font-size: 2.4rem;
font-weight: 300;
color: white;
margin-bottom: 20px;
text-shadow: 0 0 3px blue;


${mobile({ textAlign: 'center', fontSize: "2rem" })}


`
export const Title = styled.h6`
font-size: 5rem;
margin-bottom: 2rem;
font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: white;
text-shadow: 0 0 3px #000;
font-weight: 300;
${mobile({ fontSize: '3rem' })}

`
export const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color:#fff;
display: flex;
justify-content: space-between;
border: 1px solid gray;
${mobile({ width: "80%" })}

`
export const Input = styled.input`
border: none;
flex: 8;
padding-left: 20px;
`
export const Button = styled.button`
flex: 1;
border: none;
color:#fff;
background-color:teal ;

`

