import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Text, Container, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import { removeItemInCart, cleanCart } from '../../store/cart/cartSlice';
import CartItem from './components/CartItem';
import CheckoutForm from './components/CheckoutForm';
import Paypal from './components/paypal';
import { authHeader, useAuth } from '../../services/auth.service';
import API from '../../utils/API';
import useCustomToast from '../../hooks/useCustomToast';

function CartPage() {
  const cart = useSelector(state => state.cart);
  const toast = useCustomToast();
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkout, setCheckout] = useState(false);
  const [profile] = useAuth();

  const bill = () => ({
    userId: profile.id,
    courseId: cart.map(cart => cart.id),
  });

  const onSubmit = async () => {
    try {
      const _authHeader = await authHeader();
      await API.post(`/payment`, bill(), {
        headers: _authHeader,
      });
      dispatch(cleanCart());
      toast({ title: 'Payment success', status: 'success' });
    } catch (error) {
      const message = error?.response?.data?.message;
      toast({ title: message, status: 'error' });
    }
  };

  const handleRemoveCartItems = val => {
    dispatch(removeItemInCart(val));
  };

  const handleRenderItems = () => {
    return cart.map(item => (
      <CartItem handleRemoveCartItems={handleRemoveCartItems} item={item} />
    ));
  };

  const handleCheckoutForm = () => {
    profile ? setCheckout(true) : history.push('/login');
  };

  const totalMoney = bill =>
    bill.reduce((total, item) => total + item.price, 0);

  return (
    <Box mt="64px" minH="90vh">
      <Box w="full" bgColor="black">
        <Container maxW="container.xl" py="16" color="white">
          <Heading
            as="h4"
            color="white"
            fontSize={['4xl', '5xl', '5xl']}
            fontWeight="medium"
          >
            Shopping Cart
          </Heading>
        </Container>
      </Box>
      <Container maxW="container.xl" py="16" color="white">
        <Flex w="full" direction={['column-reverse', 'column-reverse', 'row']}>
          <Box w={['full', 'full', 2 / 3]}>
            <Box>
              <Text fontSize="18px" fontWeight="400" color="#29303B">
                {' '}
                {cart.length} Courses in Cart
              </Text>
            </Box>
            <Flex direction="column">
              <Box>
                <Flex direction="column">{handleRenderItems()}</Flex>
              </Box>
            </Flex>
          </Box>

          <Box
            w={['full', 'full', 1 / 3]}
            ml={['0', '0', '5']}
            mb={['5', '5', '0']}
          >
            {checkout ? (
              <Paypal totalMoney={totalMoney(cart)} onSubmit={onSubmit} />
            ) : (
              <CheckoutForm
                totalMoney={totalMoney(cart)}
                onClick={() => handleCheckoutForm()}
              />
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default CartPage;
