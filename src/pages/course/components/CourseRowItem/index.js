import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';
import {
  LinkBox,
  Box,
  Image,
  Text,
  LinkOverlay,
  HStack,
  Heading,
  Link,
} from '@chakra-ui/react';

import StarGroup from '../../../../components/StarGroup';
import LinesEllipsis from 'react-lines-ellipsis';
import CourseButton from '../../../../components/CourseButton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, checkInCart } from '../../../../store/cart/cartSlice';
function CourseRowItem(props) {
  const {
    id,
    title,
    description,
    instructor,
    price,
    rate,
    imageURL,
    category,
  } = props.data;
  const dispatch = useDispatch();
  const added = useSelector(state => checkInCart(state, id));
  const { rating, score } = rate;
  const point = rating > 0 ? score / (rating * 2) : 0;

  const handleAddToCart = val => {
    dispatch(addToCart(val));
  };

  return (
    <Box
      py="5"
      alignItems="start"
      borderBottomWidth="1px"
      borderColor="gray.200"
      justifyContent="space-between"
    >
      <LinkBox flex="1">
        <HStack alignItems="start">
          <Image
            w={['12rem', '12rem', '15rem', '15rem']}
            h="10rem"
            objectFit="cover"
            src={imageURL}
            alt={title}
            rounded="md"
          />

          <Box
            display="flex"
            flex="1"
            flexDirection={['column', 'column', 'column', 'row']}
            pl="2"
          >
            <Box width="100%">
              <Heading as="h4" fontSize={['md', 'md', 'xl']} pb="2">
                <LinkOverlay
                  as={ReactLink}
                  to={`/categories/${category?.name}/courses/${id}`}
                >
                  <LinesEllipsis text={title} maxLine={2} />
                </LinkOverlay>
              </Heading>
              <Text
                pb="2"
                display={['none', 'none', 'block']}
                fontSize={['sm', 'sm', 'lg']}
              >
                <LinesEllipsis text={description} maxLine={2} />
              </Text>
              <Text pb="2" color="gray.400">
                {`${instructor?.firstName} ${instructor?.lastName}`}
              </Text>
              <StarGroup point={point} rating={rating} />
            </Box>
            {props.paid ? (
              <Box fontWeight="bold">
                <Link
                  as={ReactLink}
                  to={`/categories/${category?.name}/courses/${id}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <CourseButton status="GO_TO_COURSE" />
                </Link>
              </Box>
            ) : (
              <Box fontWeight="bold">
                <Text
                  textAlign={['left', 'left', 'left', 'right']}
                  mb={['0.6rem', '0.6rem', '0.8rem', '5.6rem']}
                >
                  ${price}
                </Text>
                {added ? (
                  <Link
                    as={ReactLink}
                    to="/cart"
                    width="full"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <CourseButton status="ADDED" />
                  </Link>
                ) : (
                  <CourseButton
                    status="ADD_TO_CART"
                    onClick={() => handleAddToCart(props.data)}
                  />
                )}
              </Box>
            )}
          </Box>
        </HStack>
      </LinkBox>
    </Box>
  );
}

CourseRowItem.prototype = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    instructor: PropTypes.object,
    rate: PropTypes.shape({
      rating: PropTypes.number,
      score: PropTypes.number,
    }),
  }),
  paid: PropTypes.bool,
};

export default CourseRowItem;
