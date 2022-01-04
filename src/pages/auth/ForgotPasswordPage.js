import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';

import useCustomToast from '../../hooks/useCustomToast';
import formValidationConfigs from './configs/formValidationConfigs';
import { reqResetPassword, resetPassword } from '../../services/auth.service';

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { emailValidate, passwordValidate } = formValidationConfigs;
  const history = useHistory();
  const toast = useCustomToast();

  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');

  const emailReset = localStorage.getItem('email_reset');
  const isResetPassword = Boolean(token && emailReset);

  const reqResetPasswordAsync = async email => {
    try {
      await reqResetPassword(email);
      localStorage.setItem('email_reset', email);
      toast({ title: 'Please check your email!', status: 'info' });
    } catch (error) {
      const message = error?.response?.data;
      toast({ title: message, status: 'error' });
    }
  };

  const resetPasswordAsync = async (email, password, token) => {
    try {
      await resetPassword(email, password, token);
      toast({ title: 'Password reset successful!', status: 'success' });
      localStorage.removeItem('email_reset');
      history.push('/login');
    } catch (error) {
      const message = error?.response?.data?.message;
      message && toast({ title: message, status: 'error' });
    }
  };

  const onSubmit = async data => {
    const { email, password } = data;
    setIsSubmitting(true);
    if (isResetPassword) {
      await resetPasswordAsync(email, password, token);
      setIsSubmitting(false);
    } else {
      await reqResetPasswordAsync(email);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isResetPassword) {
      setValue('email', emailReset, { shouldValidate: true });
    }
  }, [emailReset, isResetPassword, setValue]);

  return (
    <Container maxW="container.xl" mt="9vh" minH="74vh">
      <Box w="320px" mx="auto" pt="3rem">
        <Heading size="sm">Reset your password!</Heading>
        <Divider my="1rem" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={2} isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaEnvelope} color="gray.400" />}
              />
              <Input
                {...register('email', emailValidate)}
                placeholder="Email"
                rounded="sm"
                isDisabled={isResetPassword}
              />
            </InputGroup>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {isResetPassword && (
            <FormControl mb={2} isInvalid={errors.password}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaLock} color="gray.400" />}
                />
                <Input
                  {...register('password', passwordValidate)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  rounded="sm"
                />
                <InputRightElement
                  children={
                    <Icon
                      as={showPassword ? AiFillEyeInvisible : AiFillEye}
                      fontSize="lg"
                      color="gray.400"
                    />
                  }
                  cursor="pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          )}

          <Button
            type="submit"
            colorScheme="red"
            w="full"
            rounded="sm"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
