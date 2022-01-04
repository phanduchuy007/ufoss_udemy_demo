import React from 'react';
import { Box, Flex, Icon, Text, Image, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsFillTagFill } from 'react-icons/bs';
import LinesEllipsis from 'react-lines-ellipsis';

function CartItem(props) {
  const { item, handleRemoveCartItems } = props;
  const { id, title, imageURL, instructor, price, category } = item;

  return (
    <Box borderWidth="2px" borderColor="gray.300" p="2" mb="2">
      <Flex flexDir={['column', 'column', 'row']}>
        <Image
          w={['full', 'full', '15rem', '15rem']}
          objectFit="cover"
          src={imageURL}
          alt={title}
          rounded="sm"
        />

        <Box
          display="flex"
          flex="1"
          flexDirection={['column', 'column', 'column', 'row']}
          pl="2"
        >
          <Box width="full">
            <Heading
              as="h4"
              color="gray.700"
              fontSize={['md', 'md', 'xl']}
              pb="2"
            >
              <Link to={`/categories/${category?.name}/courses/${id}`}>
                <LinesEllipsis text={title} maxLine={2} />
              </Link>
            </Heading>
            <Text color="gray.400">
              {`${instructor?.firstName} ${instructor?.lastName}`}
            </Text>
          </Box>
        </Box>

        <Box px="5">
          <Box
            fontSize="sm"
            color="gray.400"
            cursor="pointer"
            textAlign="right"
            mb="2"
            onClick={() => handleRemoveCartItems(item)}
          >
            Remove
          </Box>
        </Box>

        <Flex>
          <Text
            paddingTop="2px"
            fontSize="15px"
            fontWeight="700"
            color="#ec5252"
            margin="0 0 0 auto"
          >
            ${Number(price).toFixed(2)}
          </Text>
          <Box marginLeft="5px">
            <Icon as={BsFillTagFill} color="#ec5252" width="15px" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CartItem;
