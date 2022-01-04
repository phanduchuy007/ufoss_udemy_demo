import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import API from '../../../../utils/API';
import { authHeader, updateProfile } from '../../../../services/auth.service';
import useCustomToast from '../../../../hooks/useCustomToast';

const ProfileForm = ({ profile }) => {
  const [firstName, setFirstName] = useState(profile.firstName || '');
  const [lastName, setLastName] = useState(profile.lastName || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const toast = useCustomToast();

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { firstName, lastName, phone };
    try {
      const _authHeader = await authHeader();
      const res = await API.put(`/user/update/${profile.id}`, payload, {
        headers: _authHeader,
      });
      updateProfile(res.data);
      toast({ title: 'Update Successful!', status: 'success' });
    } catch (error) {
      const message = error?.response?.data?.message;
      toast({ title: message, status: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb="3">
        <FormLabel color="gray.700" fontWeight="bold">
          First Name :
        </FormLabel>
        <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </FormControl>
      <FormControl mb="3">
        <FormLabel color="gray.700" fontWeight="bold">
          Last Name :
        </FormLabel>
        <Input value={lastName} onChange={e => setLastName(e.target.value)} />
      </FormControl>
      <FormControl mb="3">
        <NumberInput
          value={phone}
          onChange={valueString => setPhone(valueString)}
        >
          <FormLabel color="gray.700" fontWeight="bold">
            Phone :
          </FormLabel>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mb="3">
        <FormLabel color="gray.700" fontWeight="bold">
          Email :
        </FormLabel>
        <Input type="email" value={profile.email} fontWeight="bold" disabled />
      </FormControl>

      <Box textAlign="right">
        <Button type="submit" colorScheme="facebook">
          Save
        </Button>
      </Box>
    </form>
  );
};

ProfileForm.prototype = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

export default ProfileForm;
