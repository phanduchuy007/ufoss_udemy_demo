import React from 'react';
import ProfileForm from './Components/ProfileForm';
import {
  Box,
  Container,
  Flex,
  Button,
  Heading,
  Avatar,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useAuth } from '../../services/auth.service';
import { STATUS } from '../../store/constant';
import SpinnerLoading from '../../components/SpinnerLoading';
import CourseRowItem from '../course/components/CourseRowItem';
import useMyCourses from '../../hooks/useMyCourses';

const Dashboard = () => {
  const [profile] = useAuth();
  const [data, status, error] = useMyCourses();

  let content;
  if (status === STATUS.FAILED) {
    content = <Text color="red.400">{error}</Text>;
  } else if (status === STATUS.LOADING) {
    content = <SpinnerLoading />;
  } else if (status === STATUS.SUCCEEDED) {
    content =
      data.length > 0 ? (
        data.map(item => {
          return <CourseRowItem key={item.id} data={item} paid={true} />;
        })
      ) : (
        <Text fontSize="lg" color="gray">
          You have 0 course
        </Text>
      );
  }

  return (
    <Container
      maxW={['container.sm', 'container.sm', 'container.lg']}
      mt="8vh"
      minH="80vh"
      pt="5"
    >
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>My Courses</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              margin="0 auto"
              textAlign="center"
              direction={['column', 'column', 'row']}
            >
              <Box w={['full', 'full', '16rem']} textAlign="center" mb="3">
                <Box pos="relative" display="inline-block">
                  <Avatar
                    size="2xl"
                    name={profile.firstName}
                    src={profile.avatarURl}
                  />
                  <Button
                    colorScheme="teal"
                    pos="absolute"
                    bottom="0"
                    right="4"
                    size="xs"
                  >
                    Edit
                  </Button>
                </Box>
                <Heading as="h5" color="gray" mt="3" fontSize="2xl">
                  {profile.username}
                </Heading>
              </Box>
              <Box flex="1">
                <Heading as="h4" size="lg" color="gray.700" textAlign="center">
                  Your Profile
                </Heading>
                <ProfileForm profile={profile} />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Box>
              <HStack alignItems="start" spacing="5">
                <Box flex="1">{content}</Box>
              </HStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
