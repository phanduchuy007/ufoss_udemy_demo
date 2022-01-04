import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { logout } from '../../services/auth.service';

const AvatarNav = props => {
  const { username, email, avatarUrl } = props.profile;
  const history = useHistory();

  const _logout = () => {
    logout();
    localStorage.removeItem('cart');
    history.go(0);
  };

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link as={ReactLink} to="/dashboard">
          <Avatar src={avatarUrl} size="sm" />
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <HStack>
              <Avatar src={avatarUrl} />
              <Box>
                <Heading as="h4" size="md">
                  {username}
                </Heading>
                <Text size="xs">{email}</Text>
              </Box>
            </HStack>
          </PopoverHeader>
          <PopoverBody>
            <Button variant="outline" w="full" border="none" onClick={_logout}>
              Logout
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default AvatarNav;
