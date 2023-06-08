import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useLocation } from 'react-router-dom';

const SuccessPageContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cde8f5; /* Add a light blue background color */
  background-image: linear-gradient(to bottom, #cde8f5, #f5f5f5); /* Add a gradient effect */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const OrderNumber = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;




const SuccessPage = () => {
  const location = useLocation();

  const orderId = location.state._id
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });



  return (
    <SuccessPageContainer style={animationProps}>
      <Title>Thank you for your order!</Title>
      <Message>Your order has been successfully processed.</Message>
      <OrderNumber>Your order number is: {orderId}</OrderNumber>
    </SuccessPageContainer>
  );
}

export default SuccessPage;