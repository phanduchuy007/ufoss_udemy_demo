import React from 'react';
import { Image, Box, Container, Heading, Text, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import Slider from 'react-slick';

import CourseCard from '../course/components/CourseCard';
import useCourses from '../../hooks/useCourses';
import { STATUS } from '../../store/constant';
import settings from './configSlider';
import SpinnerLoading from '../../components/SpinnerLoading';

function HomePage() {
  const [data, status, error] = useCourses();

  let content;
  if (status === STATUS.FAILED) {
    content = <Text color="red.400">{error}</Text>;
  } else if (status === STATUS.LOADING) {
    content = <SpinnerLoading />;
  } else if (status === STATUS.SUCCEEDED) {
    content = (
      <>
        {data.map(({ id, name, children }) => (
          <Box mb="2" key={id}>
            <Heading as="h3" mb="5" fontSize="20px" textTransform="capitalize">
              <Link as={ReactLink} to={`/categories/${name}`}>
                {name}
              </Link>
            </Heading>
            <Slider {...settings}>
              {children?.map(item => (
                <Box px="2" pb="5" key={item.id}>
                  <CourseCard data={item} />
                </Box>
              ))}
            </Slider>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Container maxW="container.2xl" mt="64px" minH="90vh">
      <Box w="full" mb="6rem">
        <Image
          src="/banner.png"
          alt="Segun Adebayo"
          objectFit="cover"
          height={['25vh', 'auto']}
        />
      </Box>
      <Box p={['1', '3', '5']}>{content}</Box>
    </Container>
  );
}

export default HomePage;
