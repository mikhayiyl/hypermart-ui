import styled from "styled-components";

export const ProductsContainer = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content:space-between
`

export const Info = styled.div`
width: 100%;
height: 100%;
position: absolute;
top:0;
left: 0;
background-color:gray;
z-index: 3;
display:flex;
align-items: center;
background-color: rgba(0,0,0,0.5);
justify-content: center;
border-radius: 5px;
opacity: 0;
transition: all 1s ease-in-out;
`
export const ProductContainer = styled.div`
flex: 1;
margin:5px;
min-width: 280px;
height: 350px;
display: flex;
justify-content: center;
align-items: center;
background-color: #f5fbd3;
position: relative;
cursor: pointer;

&:hover ${Info}{
opacity: 1;
}
`
export const Circle = styled.div`
height: 200px;
width: 200px;
border-radius:50%;
background-color: white;
position:absolute;
`
export const Image = styled.img`
height: 50%;
z-index: 2;

`

export const Icon = styled.div`
cursor: pointer;
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content:center;
margin:10px;
transition: all 0.5s ease-in-out;

&:hover{
    background-color:orangered;
    transform:scale(1.1);
}
`
