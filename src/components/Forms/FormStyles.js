import styled from "styled-components";
import { Link } from 'react-router-dom';
import { mobile } from "../../utilities/Responsive";

export const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background:linear-gradient(rgba(245,245,245,0.3),rgba(0,0,0,0.5)),url("/assets/images/fruits/grape.png"),center ;
background-size: 25em;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  
}
${mobile({ justifyContent: 'center' })}

   
`;
export const FormWrapper = styled.form`
 width: 350px;
  border-radius: 20px;
  /* background-color: #ff440057; */
  padding: 0.7rem;
  color: #fff;
  background-image: repeating-conic-gradient(
    from 45deg,
    #00138082 0deg 90deg,
    #4c2c0784 90deg 180deg
  );
  
`;


export const smallText = styled.small`
font-weight: 500;
`


export const Button = styled.button`
display: block;
  width: 100%;
  padding: 8px 22px;
  background-color: ${(props) => props.color};
  color: #fff;
  border-radius: 10px;
  border: none;
  margin-top: 10px;

  &:disabled{
    opacity: 0.7;
  }
`


export const FormLink = styled(Link)`
text-decoration: none;
`

export const AdvertContainer = styled.div`
width: 350px;
height: auto;
display: flex;
align-items: center;
flex-direction: column;
text-align: center;

h6{
    color: blue;
    font-size: 2.5rem;
    font-weight: 600;
}

p{
    font-size: 1.3rem;
    font-weight:400;
}

`