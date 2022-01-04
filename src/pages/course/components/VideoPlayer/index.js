import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/lazy';
import PropTypes from 'prop-types';

function VideoPlayer(props) {
  const { isOpen, onClose, source } = props;

  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Box className="player-wrapper">
            <ReactPlayer
              playing
              url={source}
              controls
              width="100%"
              height="100%"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

VideoPlayer.prototype = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default VideoPlayer;
