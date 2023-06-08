import { SendOutlined } from '@material-ui/icons'
import React from 'react'
import { Container, Desc, InputContainer, Title, Input, Button } from './NewletterStyles'

const NewsLetter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum.</Desc>
            <InputContainer>
                <Input placeholder='email' />
                <Button>
                    <SendOutlined />
                </Button>
            </InputContainer>

        </Container>
    )
}

export default NewsLetter