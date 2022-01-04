import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './style.css';
import { Box, Icon } from '@chakra-ui/react';

const Paginator = props => {
  const { totalPages, onPageChange } = props;

  const handlePageClick = ({ selected }) => {
    onPageChange(selected);
  };

  return (
    <Box w="full" mb="5">
      <ReactPaginate
        previousLabel={<Icon as={FaAngleLeft} />}
        nextLabel={<Icon as={FaAngleRight} />}
        pageCount={totalPages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </Box>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Paginator;
