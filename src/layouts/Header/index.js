import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import SearchBar from '../../components/SearchBar';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../services/auth.service';
import AvatarNav from '../../components/AvatarNav';
import useCategories from '../../hooks/useCategories';
import useSearchCourses from '../../hooks/useSearchCourses';
import { STATUS } from '../../store/constant';
import Cart from '../../components/Cart';

const Header = () => {
  const [profile] = useAuth();
  const [categories] = useCategories();
  const [isLargeScreen] = useMediaQuery('(min-width: 42rem)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState();
  const [data, status] = useSearchCourses(searchTerm);
  const cart = useSelector(state => state.cart);

  const loginSignupButtons = (
    <Box>
      <Link href="/login" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="teal" variant="outline" px={6}>
          Log in
        </Button>
      </Link>
      <Link href="/register" ml={3} _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="teal" variant="solid" px={6}>
          Sign up
        </Button>
      </Link>
    </Box>
  );

  const avatarComponent = (
    <Link as={ReactLink} to="/dashboard" onClick={() => onClose()}>
      <HStack>
        <Avatar src={profile?.avatarUrl} />
        <Box>
          <Heading as="h4" size="md">
            {profile?.username}
          </Heading>
          <Text fontSize="sm">{profile?.email}</Text>
        </Box>
      </HStack>
    </Link>
  );

  const listCategoryLinks = categories?.map(({ id, name }) => (
    <ListItem key={id} onClick={() => onClose()}>
      <Link as={ReactLink} to={`/categories/${name}`}>
        {name}
      </Link>
    </ListItem>
  ));

  const menuCategoryItems = categories?.map(({ id, name }) => (
    <MenuItem key={id} onClick={() => onClose()}>
      <Link as={ReactLink} to={`/categories/${name}`} display="inline-block">
        {name}
      </Link>
    </MenuItem>
  ));

  const logoItem = (
    <Link href="/" display="inline-block">
      <Image src={logo} />
    </Link>
  );

  return (
    <HStack
      px={5}
      py={3}
      boxShadow="md"
      position="fixed"
      top="0"
      w="full"
      bgColor="white"
      zIndex="10"
    >
      <HStack>
        {!isLargeScreen && <Icon as={HiMenu} fontSize="3xl" onClick={onOpen} />}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader flex="" borderBottomWidth="1px">
              {profile ? avatarComponent : loginSignupButtons}
            </DrawerHeader>
            <DrawerBody>
              <List spacing="3" mt="3">
                {listCategoryLinks}
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {isLargeScreen && logoItem}
        {isLargeScreen && (
          <Menu isLazy>
            <MenuButton px={6} pt={0.5} fontWeight="medium">
              Category
            </MenuButton>
            <MenuList>{menuCategoryItems}</MenuList>
          </Menu>
        )}
      </HStack>

      {!isLargeScreen && (
        <Box flex={!isLargeScreen && 1} textAlign="center">
          {logoItem}
        </Box>
      )}

      <SearchBar
        data={data}
        onChange={setSearchTerm}
        isSearching={status === STATUS.LOADING}
        isLargeScreen={isLargeScreen}
      />

      {isLargeScreen ? (
        <HStack>
          <Box>
            <Cart amount={cart.length} />
          </Box>
          {profile ? <AvatarNav profile={profile} /> : loginSignupButtons}

          <Menu>
            <MenuButton p={1}>
              <Icon as={FaGlobe} fontSize="xl" color="gray.500" />
            </MenuButton>
            <MenuList>
              <MenuItem>VN</MenuItem>
              <MenuItem>EN</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      ) : (
        <Cart amount={cart.length} />
      )}
    </HStack>
  );
};

export default Header;
