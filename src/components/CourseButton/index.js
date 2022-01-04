import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

const CourseButton = props => {
  const { status, onClick } = props;

  const textContentBtn = status => {
    if (status === 'ADD_TO_CART') return 'Add To Card';
    if (status === 'ADDED') return 'Go to cart';
    if (status === 'GO_TO_COURSE') return 'Go To Course';
  };

  const _colorScheme = status => {
    if (status === 'GO_TO_COURSE') {
      return 'blue';
    }
    if (status === 'ADDED') {
      return 'green';
    }
    return 'red';
  };

  return (
    <Button
      colorScheme={_colorScheme(status)}
      width="full"
      variant={status === 'GO_TO_COURSE' ? 'outline' : 'solid'}
      fontSize={['sm', 'sm', 'md']}
      onClick={() => onClick && onClick()}
    >
      {textContentBtn(status)}
    </Button>
  );
};

CourseButton.propTypes = {
  status: PropTypes.oneOf(['ADD_TO_CART', 'ADDED', 'GO_TO_COURSE']),
  onClick: PropTypes.func,
};

export default CourseButton;
