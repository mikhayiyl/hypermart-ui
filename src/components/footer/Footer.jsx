import { Facebook, GitHub, Instagram, MailOutlineRounded, PhoneAndroid, Pinterest, RoomRounded, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../../utilities/Responsive'
import NewsLetter from '../subscription/NewsLetter'

const FooterContainer = styled.div`
display: flex;
width: 100%;
${mobile({ flexDirection: "column" })}


`
const FooterLeft = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 10px;
`
const FooterCenter = styled.div`

flex: 1;
padding: 20px;
${mobile({ display: "none" })}

`
const FooterRight = styled.div`
flex: 1;
padding:20px;

${mobile({ backgroundColor: "gray" })}


`
const Title = styled.h3`
margin-bottom: 1.8rem;
`
const List = styled.ul`
margin: 0;
padding:0;
list-style: none;
display: flex;
flex-wrap: wrap;
`
const ListItem = styled.li`
width:50% ;
margin-bottom:0.8rem;

`

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items: center;
`
const Payment = styled.img`
width: 50%;
`
const Logo = styled.div`

`
const Description = styled.p`
margin: 20px 0;

`
const SocialMedia = styled.div`
display: flex;
`
const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius:50%;
color:#fff;
background-color: ${props => props.bg};
display:flex;
align-items: center;
justify-content: center;
margin:0.5rem;
cursor: pointer;
`

const Footer = () => {
    return (<>
        <NewsLetter />
        <FooterBottom />
    </>

    )
}

export default Footer;


const FooterBottom = () => <FooterContainer>

    <FooterLeft>
        <Logo>MIKHAYIYL</Logo>
        <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aliquam.
        </Description>
        <SocialMedia>
            <SocialIcon bg='blue'>
                <Facebook />
            </SocialIcon>
            <SocialIcon bg='green'>
                <Instagram />
            </SocialIcon>
            <SocialIcon bg='blue'>
                <Twitter />
            </SocialIcon>
            <SocialIcon bg='red'>
                <Pinterest />
            </SocialIcon>
            <SocialIcon bg='gray'>
                <GitHub />
            </SocialIcon>

        </SocialMedia>
    </FooterLeft>

    <FooterCenter>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>Contact us</ListItem>
        </List>
    </FooterCenter>

    <FooterRight>
        <Title>Contact</Title>
        <ContactItem>
            <RoomRounded />   Lorem, ipsum dolor.
        </ContactItem>
        <ContactItem>
            <PhoneAndroid />
            +23333000xxxxxxx
        </ContactItem>
        <ContactItem>
            <MailOutlineRounded />
            contact@example.com
        </ContactItem>
        <Payment src='' />
    </FooterRight>
</FooterContainer>