import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';

import footerLogo from '../../assets/images/logo-footer.png';

const Footer = () => {
  return (
    <HStack
      w="full"
      bottom="0"
      px="3rem"
      py="2rem"
      borderTop="1px"
      borderColor="gray.200"
      justify="space-between"
      bgColor="white"
    >
      <Image src={footerLogo} />
      <Text>© 2021 Udemy</Text>
    </HStack>
  );
};

export default Footer;
