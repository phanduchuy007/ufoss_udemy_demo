import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
  login,
  register as signUp,
  tokenProvider,
} from '../../services/auth.service';
import ButtonSocialLogin from './components/ButtonSocialLogin';
import formValidationConfigs from './configs/formValidationConfigs';
import useCustomToast from '../../hooks/useCustomToast';

function Authentication() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const toast = useCustomToast();
  let isSignUp = location.pathname === '/register';

  const { usernameValidate, emailValidate, passwordValidate } =
    formValidationConfigs;

  const signUpAsync = async (username, email, password) => {
    try {
      await signUp(username, email, password);
      toast({
        title:
          'Account created. Please check your email then verify before login!',
        status: 'success',
      });
      history.push('/login');
    } catch (error) {
      const message = error?.response?.data?.message;
      message &&
        toast({
          title: message,
          status: 'error',
        });
    }
  };

  const loginAsync = async (username, password) => {
    try {
      await login(username, password);
      history.push('/');
    } catch (error) {
      const message = error?.response?.data?.message;
      toast({
        title: message,
        status: 'error',
      });
    }
  };

  const onSubmit = async data => {
    const { username, email, password } = data;
    setIsSubmitting(true);
    if (isSignUp) {
      await signUpAsync(username, email, password);
      setIsSubmitting(false);
    } else {
      await loginAsync(username, password);
      setIsSubmitting(false);
    }
    reset();
  };

  const _onSuccessLoginGoogle = res => {
    var id_token = res.getAuthResponse().id_token;
    tokenProvider.setToken({ accessToken: id_token });
    history.push('/');
  };

  const _onFailureLoginGoogle = res => {};

  return (
    <Container maxW="container.xl" mt="64px" minH="74vh">
      <Box w="320px" mx="auto" pt="3rem">
        {isSignUp ? (
          <Heading size="sm">Sign-Up and Start Learning!</Heading>
        ) : (
          <Heading size="sm">Log-In to Your Udemy Account</Heading>
        )}

        <Divider my="1rem" />

        {!isSignUp && (
          <Box mb={3}>
            <ButtonSocialLogin
              provider="google"
              onSuccess={_onSuccessLoginGoogle}
              onFailure={_onFailureLoginGoogle}
            />
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
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
                />
              </InputGroup>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          )}

          <FormControl mb={2} isInvalid={errors.username}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaUserAlt} color="gray.400" />}
              />
              <Input
                {...register('username', usernameValidate)}
                placeholder="User Name"
                rounded="sm"
              />
            </InputGroup>
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mb={2} isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.400" />}
              />
              <Input
                {...register('password', isSignUp && passwordValidate)}
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

          <FormControl as="fieldset" mb={4}>
            {isSignUp ? (
              <Checkbox
                {...register('rememberMe')}
                size="sm"
                color="gray.700"
                alignItems="baseline"
              >
                I agree to your Term of Use and Privacy Policy
              </Checkbox>
            ) : (
              <Checkbox {...register('rememberMe')} size="sm" color="gray.700">
                Remember me?
              </Checkbox>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="red"
            w="full"
            rounded="sm"
            isLoading={isSubmitting}
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
        </form>

        {!isSignUp && (
          <Text textAlign="center" mt={4}>
            or{' '}
            <Link href="/reset-password" color="blue.300">
              Forgot Password
            </Link>
          </Text>
        )}

        <Divider my="1rem" />

        {isSignUp ? (
          <Text textAlign="center" mt={5}>
            Already have an account?{' '}
            <Link href="/login" color="blue.400">
              Log In
            </Link>
          </Text>
        ) : (
          <Text textAlign="center" mt={5}>
            Don't have an account?
            <Link href="/register" color="blue.400" ml="1">
              Sign up
            </Link>
          </Text>
        )}
      </Box>
    </Container>
  );
}

export default Authentication;
