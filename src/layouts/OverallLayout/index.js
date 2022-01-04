import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const OverallLayout = props => {
  const location = useLocation();

  if (location.pathname === '/notFound') {
    return <Fragment>{props.children}</Fragment>;
  }

  return (
    <Fragment>
      <Header />
      <Box>{props.children}</Box>
      <Footer />
    </Fragment>
  );
};

OverallLayout.propTypes = {
  children: PropTypes.element,
};

export default OverallLayout;
