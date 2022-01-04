import { Icon, Link, Tag } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Cart = ({ amount }) => {
  return (
    <Link as={ReactLink} to="/cart" display="inline-block" pos="relative">
      <Icon
        as={AiOutlineShoppingCart}
        fontSize="2xl"
        cursor="pointer"
        color="gray.500"
        mr={3}
      />
      {amount > 0 && (
        <Tag
          borderRadius="full"
          size="sm"
          pos="absolute"
          top="0"
          right="0"
          color="white"
          bgColor="red"
        >
          {amount}
        </Tag>
      )}
    </Link>
  );
};

Cart.prototype = {
  amount: PropTypes.number,
};

export default Cart;
