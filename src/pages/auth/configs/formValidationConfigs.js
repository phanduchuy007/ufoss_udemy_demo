/* eslint-disable import/no-anonymous-default-export */
const usernameValidate = {
  required: 'Username is required',
  minLength: {
    value: 3,
    message: 'The minimum length is 3',
  },
  maxLength: {
    value: 20,
    message: 'The maximum length is 20',
  },
};

const emailValidate = {
  required: 'Email is required',
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'You have entered an invalid email address!',
  },
};

const passwordValidate = {
  required: 'Password is required',
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
    message:
      'The password must be between 8 and 20 characters including at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  },
};

export default {
  usernameValidate,
  emailValidate,
  passwordValidate,
};
