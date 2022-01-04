import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarGroup = ({ point, rating, showPoint = false, showRating = true }) => {
  const avgScore = point.toPrecision(2);

  const listStar = new Array(5);
  for (let i = 0; i < 5; i++) {
    if (point >= 1) {
      listStar.push(FaStar);
      point -= 1;
    } else if (point >= 0.5) {
      listStar.push(FaStarHalfAlt);
      point -= 0.5;
    } else {
      listStar.push(FaRegStar);
    }
  }

  return (
    <HStack
      display="flex"
      flexDir={['column', 'column', 'row']}
      alignItems="start"
      fontSize="sm"
      mb="2"
    >
      {showPoint && <Text pt="0.5">{avgScore} </Text>}
      <Box>
        {listStar.map((icon, index) => (
          <Icon
            as={icon}
            key={index}
            fontSize="lg"
            color="yellow.400"
            mr="0.5"
          />
        ))}
      </Box>
      {showRating && <Text pt="0.5">({rating} ratings)</Text>}
    </HStack>
  );
};

StarGroup.prototype = {
  point: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  showPoint: PropTypes.bool,
  showRating: PropTypes.bool,
};

export default StarGroup;
