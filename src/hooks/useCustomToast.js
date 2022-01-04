import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();
  return ({ title, status }) =>
    toast({
      title,
      status,
      duration: 5000,
      position: 'top',
      isClosable: true,
    });
};

export default useCustomToast;
