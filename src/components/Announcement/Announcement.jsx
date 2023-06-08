import React from 'react'
import styled from "styled-components";

const Container = styled.div`
height: 30px;
background-color: teal;
color:white;
text-align:center;
font-weight:500;
`
const Announcement = () => {
    return (
        <Container>
            Super Deal Free Shipping on deals over $50
        </Container>
    )
}

export default Announcement