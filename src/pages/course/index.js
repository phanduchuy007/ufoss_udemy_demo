import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Container,
  Grid,
  GridItem,
  HStack,
  Icon,
  Button,
  useDisclosure,
  ModalHeader,
  Flex,
} from '@chakra-ui/react';
import LinesEllipsis from 'react-lines-ellipsis';

import StarGroup from '../../components/StarGroup';
import CourseWidget from './components/CourseWidget';
import { useParams } from 'react-router-dom';
import useCourseById from '../../hooks/useCourseById';
import { FaRegPlayCircle, FaStar } from 'react-icons/fa';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';
import { authHeader, useAuth } from '../../services/auth.service';
import API from '../../utils/API';
import useRate from '../../hooks/useRate';
import useCustomToast from '../../hooks/useCustomToast';

import { STATUS } from '../../store/constant';
import SpinnerLoading from '../../components/SpinnerLoading';
import VideoPlayer from './components/VideoPlayer';
import { isMyCourses } from '../../store/myCourses/myCoursesSlice';
import { useSelector } from 'react-redux';

function CourseDetail() {
  const [ratedBtn, setRatedBtn] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const toast = useCustomToast();
  const [profile] = useAuth();
  const {
    isOpen: isOpenVideo,
    onOpen: onOpenVideo,
    onClose: onCloseVideo,
  } = useDisclosure();
  const {
    isOpen: isOpenRate,
    onOpen: onOpenRate,
    onClose: onCloseRate,
  } = useDisclosure();
  const { category, courseId } = useParams();
  const [data, status, error] = useCourseById(category, courseId);
  const checkRated = useRate(courseId, profile?.id);
  const isMyCourse = useSelector(state => isMyCourses(state, courseId));

  if (status === STATUS.FAILED) {
    return (
      <Container maxW="container.2xl" mt="64px" minH="90vh">
        <Text color="red" fontSize="xl">
          {error}
        </Text>
      </Container>
    );
  }

  if (status === STATUS.LOADING || !data) {
    return (
      <Container maxW="container.2xl" mt="64px" minH="90vh" pt="5">
        <SpinnerLoading />
      </Container>
    );
  }

  const { title, description, rate, instructor, lessons } = data;
  const { rating, score } = rate;
  const point = rating > 0 ? score / (rating * 2) : 0;
  const listLesson = () =>
    lessons?.map((lesson, index) => (
      <HStack key={lesson.id} py="2">
        <Icon as={FaRegPlayCircle} mr="2" color="gray.400" />
        <Box
          onClick={() => onOpenVideoPlayer(lesson.videoURL)}
          cursor="pointer"
        >
          <LinesEllipsis text={`Lecture ${index}: ${lesson.title}`} />
        </Box>
      </HStack>
    ));

  const onOpenVideoPlayer = url => {
    setVideoPlaying(url);
    onOpenVideo();
  };

  const ratingChanged = async newRating => {
    try {
      const values = { userId: profile.id, score: newRating * 2 };
      const _authHeader = await authHeader();
      await API.post(
        `/categories/${category}/courses/${courseId}/rate`,
        values,
        {
          headers: _authHeader,
        }
      );
      onCloseRate();
      toast({ title: 'Thank You!', status: 'success' });
      setRatedBtn(false);
    } catch (error) {
      const message = error.response?.data?.message;
      toast({ title: message, status: 'error' });
    }
  };

  return (
    <Box w="full" mt="64px" minH="90vh">
      <Box
        w="full"
        bgGradient="linear(to-r, purple.500, pink.500)"
        px={['0', '2', '5']}
      >
        <Container maxW="container.xl" py={['8', '8', '16']} color="white">
          <Grid templateColumns="repeat(3, 1fr)" gap={['6', '6', '6', '12']}>
            <GridItem colSpan={[3, 3, 2]}>
              <Heading lineHeight="normal" fontWeight="bold" mb="5">
                {title}
              </Heading>
              <Text fontSize="md" mb="3">
                <LinesEllipsis text={description} maxLine={3} />
              </Text>
              <Box mb="3">
                <StarGroup rating={rating} point={point} showAvg={true} />
              </Box>
              <Text as="i" fontSize="md">
                Created by{' '}
                <Text as="b">{`${instructor.firstName} ${instructor.lastName}`}</Text>
              </Text>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box px={['0', '2', '5']}>
        <Container maxW="container.xl">
          <Grid templateColumns="repeat(3, 1fr)" gap={['6', '6', '6', '12']}>
            <GridItem
              colSpan={[3, 3, 2]}
              rowStart={[2, 2, 1]}
              rowEnd={[3, 3, 2]}
            >
              <Flex justifyContent="space-between" mt={['2', '2', '8']} mb="5">
                <Heading as="h5" size="lg">
                  Course content
                </Heading>
                {profile && isMyCourse && !checkRated && ratedBtn && (
                  <Button size="sm" fontWeight="normal" onClick={onOpenRate}>
                    <Icon as={FaStar} mr="2" color="yellow.400" />
                    Leave a rating
                  </Button>
                )}
                <Modal isOpen={isOpenRate} onClose={onCloseRate}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign="center">Rate Course</ModalHeader>
                    <Box margin="0 auto">
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={50}
                        isHalf={true}
                      />
                    </Box>
                  </ModalContent>
                </Modal>
              </Flex>
              <Box borderWidth="1px" p="3" rounded="sm" mb="3">
                {listLesson()}
              </Box>
            </GridItem>
            <GridItem
              colSpan={[3, 3, 1]}
              rowStart="1"
              rowEnd={[2, 2, 2]}
              pos="relative"
              top={['0', '0', '-12rem']}
              mt={['5', '5', '0']}
            >
              <Box pos="sticky" top="4rem">
                <CourseWidget data={data} />
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      {videoPlaying && (
        <VideoPlayer
          source={videoPlaying}
          isOpen={isOpenVideo}
          onClose={onCloseVideo}
        />
      )}
    </Box>
  );
}
export default CourseDetail;
