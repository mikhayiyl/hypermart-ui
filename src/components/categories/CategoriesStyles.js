import styled from "styled-components";
import { mobile } from "../../utilities/Responsive";
import { Link } from "react-router-dom";




export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    padding:0;
    overflow-y:visible;
    overflow-x:auto;
    position: relative;
    padding: 5px;
    

    ::-webkit-scrollbar{
        height: 5px;
    }
    
    ::-webkit-scrollbar-track{
        background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb{
        background-color: gray;
     border-radius: 10px;
  } 

  h2{
    position: sticky;
    top: 0;
    left: 0;
    text-align: center;
    color:#17353d;
    text-shadow:0 0 3px yellow,0 0 5px #fff;
    font-size: 1.3rem;
    font-weight: 400;
  }  

`;

export const HorizontalSLider = styled.div`
-ms-box-orient: horizontal;
-ms-display:flex;
-webkit-display:flex;
-webkit-overflow-scrolling: touch;
scrollbar-width: thin;
display: -ms-flexbox;
display: -webkit-box;
display: flex;
display: flexbox;
justify-content: center;
flex-direction:row;
width:auto;
min-width:100%;
height: auto;
`;

//category

export const Info = styled.span`
position: absolute;
bottom: 0;
text-align: center;
    
    p{
        font-size: 14px;
        font-weight: 500;
    }
`



export const Image = styled.img`
height: 60%;
object-fit: contain;
transition:all 0.5s ease-in-out;
${mobile({ width: "100%", })}
`

export const Price = styled.small`
    color: #333;
    font-size: 13px;
    font-weight: 500;

    &:hover{
    color:#fff;
    text-shadow:0px 0px 3px #000,0 0 5px #000;
    }
    
`

export const Buy = styled.span`
position: absolute;
bottom: 2px;
left: 2px;
z-index: 4;
transform: 0.5s ease-in-out;
`

export const Container = styled(Link)`
width: 200px;
height: 150px;
 overflow: hidden;
 display: flex;
 justify-content: center;
 align-items: center;
 position: relative;
 padding: 0.3em;
 flex-direction: column;
 background-color: #f5fbd3;
 margin:7px;
 color: #000;
 text-decoration: none;
 backdrop-filter:blur(25px);
 transition:all 0.5s ease-in-out;
cursor: pointer; 

${mobile({ width: "100px", height: "100px", flexDirection: "column" })}

&:hover {
background: rgba(0,0,0,0.5);
${Image}{
    transform: scale(1.5);
}


${Info},${Price}{
z-index: 3;
color:#fff;
font-size: 1rem;
text-shadow:0px 0px 3px #000,0 0 5px #000;
opacity: 1;
}
}



`


export const LinkR = styled(Link)`
position: absolute;
right: 20px;
top: 0;
`