import styled from "styled-components"
import { mobile } from "../../utilities/Responsive"

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const Wrapper = styled.div`
padding: 5px;
display: flex; 
${mobile({ padding: "10px", flexDirection: "column" })}

`
export const ImgContainer = styled.div`
flex: 1;
`
export const Img = styled.img`
width: 100%;
height: 90vh;
object-fit: contain;
${mobile({ height: "40vh" })}

`
export const Title = styled.h2`
font-weight: 200;
`
export const Price = styled.label`
font-weight: 100;
font-size: 40px;

`
export const Desc = styled.p`
margin: 20px;
`
export const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;
${mobile({ padding: "10px" })}

`
export const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
width: 50%;
margin: 30px 0;

${mobile({ width: "100%" })}

`
export const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
margin: 0 5px;
border:1px solid #000;
cursor: pointer;
`
export const Filter = styled.div`
display: flex;
align-items: center;
`
export const FilterTitle = styled.option`
font-size: 20px;
font-weight: 200;

`
export const FilterSize = styled.select`
margin-left: 5px;
padding: 5px;
`
export const FilterOption = styled.option`
font-size: 1.1rem;
line-height: 1;
font-weight: 400;

`

export const AmountContainer = styled.div`
display: flex;
font-weight: 700;
justify-content: center;
align-items: center;
cursor: pointer;
width: 100%;

`



export const Table = styled.table`
width: 100px;
height: 100px;
`