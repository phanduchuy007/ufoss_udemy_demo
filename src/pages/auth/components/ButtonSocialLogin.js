import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

const ButtonSocialLogin = props => {
  const { provider = 'google', onSuccess, onFailure } = props;

  const _onSuccess = res => {
    onSuccess(res);
  };

  const _onFailure = res => {
    onFailure(res);
  };

  return (
    <Fragment>
      {provider === 'google' && (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Continue with Google"
          onSuccess={_onSuccess}
          onFailure={_onFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </Fragment>
  );
};

ButtonSocialLogin.propTypes = {
  provider: PropTypes.string,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

export default ButtonSocialLogin;
