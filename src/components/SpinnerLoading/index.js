import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

const SpinnerLoading = () => {
  return (
    <Box textAlign="center">
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default SpinnerLoading;
