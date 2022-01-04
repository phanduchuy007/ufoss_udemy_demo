import {
  Box,
  Button,
  Collapse,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Select,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdDehaze } from 'react-icons/md';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import qs from 'query-string';

import useCoursesByCategory from '../../hooks/useCoursesByCategory';
import { STATUS } from '../../store/constant';
import CourseRowItem from '../course/components/CourseRowItem';
import FilterComponent from './components/FilterComponent';
import Paginator from './components/Paginator';
import SpinnerLoading from '../../components/SpinnerLoading';

function CategoryPage() {
  const history = useHistory();
  const { category } = useParams();
  const { search, pathname } = useLocation();
  const [query, setQuery] = useState(qs.parse(search));
  const [data, status, error] = useCoursesByCategory(
    category,
    query
  );
  const [isSmallScreen] = useMediaQuery('(max-width: 1024px)');
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  let content;
  if (status === STATUS.FAILED) {
    content = <Text color="red.400">{error}</Text>;
  } else if (status === STATUS.LOADING) {
    content = <SpinnerLoading />;
  } else if (status === STATUS.SUCCEEDED) {
    content = data.data?.map(item => {
      return <CourseRowItem key={item.id} data={item} />;
    });
  }

  const handleFilter = v => {
    const newQuery = { ...query, ...v };
    setQuery(newQuery);
    history.push(pathname + '?' + qs.stringify(newQuery));
  };

  const handleSelection = value => {
    const newQuery = { ...query, criteria: value };
    setQuery(newQuery);
    history.push(pathname + '?' + qs.stringify(newQuery));
  };

  const handlePageChange = selected => {
    const newQuery = { ...query, page: selected };
    setQuery(newQuery);
    history.push(pathname + '?' + qs.stringify(newQuery));
  };

  return (
    <Container
      maxW={['container.sm', 'container.sm', 'container.md', 'container.2xl']}
      mt="8vh"
      minH="90vh"
    >
      <Heading py="5" size="xl">
        {category}
      </Heading>
      <Box>
        <HStack>
          <HStack w="20rem">
            {isSmallScreen ? (
              <Button
                leftIcon={<MdDehaze />}
                onClick={onOpen}
                colorScheme="blue"
                variant="outline"
              >
                Filter
              </Button>
            ) : (
              <Button
                leftIcon={<MdDehaze />}
                onClick={onToggle}
                colorScheme="blue"
                variant="outline"
              >
                Filter
              </Button>
            )}
            <Select
              placeholder="Select option"
              defaultValue="newest"
              onChange={e => handleSelection(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="sellest">Best Seller</option>
            </Select>
          </HStack>
          <Text flex="1" color="gray.400" fontSize="lg" textAlign="right">
            {data.totalItems} results
          </Text>
        </HStack>

        <HStack alignItems="start" spacing="5">
          {isSmallScreen ? (
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filter</DrawerHeader>

                <DrawerBody>
                  <FilterComponent onFilter={handleFilter} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          ) : (
            <Collapse
              in={isOpen}
              animateOpacity
              style={{
                width: '20rem',
                marginTop: '1.25rem',
              }}
            >
              <FilterComponent onFilter={handleFilter} />
            </Collapse>
          )}
          <Box flex="1">{content}</Box>
        </HStack>
      </Box>
      <Paginator
        currentPage={data.currentPage}
        totalItems={data.totalItems}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}
export default CategoryPage;
