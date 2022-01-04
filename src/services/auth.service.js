/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import API from '../utils/API';

const createTokenProvider = () => {
  let _token = localStorage.getItem('TOKEN_AUTH');
  _token = _token ? JSON.parse(_token) : null;
  let listeners = [];

  const getExpirationDate = jwtToken => {
    if (!jwtToken) {
      return null;
    }
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };

  const isExpired = exp => {
    if (!exp) {
      return null;
    }

    return Date.now() > exp;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.accessToken))) {
      const updatedToken = await API.post(
        '/auth/refresh-token',
        {},
        {
          headers: {
            Authorization: _token.refreshToken,
          },
        }
      );

      setToken(updatedToken);
    }

    return _token && _token.accessToken;
  };

  const loggedIn = () => {
    if (!_token) {
      return null;
    }
    const userInfo = _token.userEntity;

    return userInfo;
  };

  const subscribe = listener => {
    listeners.push(listener);
  };

  const unsubscribe = listener => {
    listeners = listeners.filter(l => l !== listener);
  };

  const notify = () => {
    const isLogged = loggedIn();
    listeners.forEach(listener => listener(isLogged));
  };

  const setToken = token => {
    if (token) {
      localStorage.setItem(
        'TOKEN_AUTH',
        JSON.stringify({ ..._token, ...token })
      );
    } else {
      localStorage.removeItem('TOKEN_AUTH');
    }
    _token = token;
    notify();
  };

  return {
    getToken,
    loggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};

export const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const register = (username, email, password) => {
    return API.post('/auth/register', {
      username,
      email,
      password,
    });
  };

  const login = (username, password) => {
    return API.post('/auth/login', {
      username,
      password,
    }).then(res => {
      if (res.data) {
        tokenProvider.setToken(res.data);
      }
      return res.data;
    });
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authHeader = async () => {
    const token = await tokenProvider.getToken();

    return token
      ? {
          Authorization: token,
        }
      : {};
  };

  const reqResetPassword = email => {
    return API.post('/auth/reset-password', { email });
  };

  const resetPassword = (email, password, token) => {
    return API.post('/auth/update-password', {
      email,
      password,
      resetPasswordToken: token,
    });
  };

  const useAuth = () => {
    const [logged, setLogged] = useState(tokenProvider.loggedIn());

    useEffect(() => {
      const listener = newLogged => {
        setLogged(newLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [logged];
  };

  const updateProfile = profile => {
    let _token = localStorage.getItem('TOKEN_AUTH');
    _token = _token ? JSON.parse(_token) : null;
    _token.userEntity = profile;
    localStorage.setItem('TOKEN_AUTH', JSON.stringify(_token));
  };

  return {
    useAuth,
    authHeader,
    register,
    login,
    logout,
    reqResetPassword,
    resetPassword,
    tokenProvider,
    updateProfile,
  };
};

export const {
  login,
  register,
  logout,
  useAuth,
  authHeader,
  reqResetPassword,
  resetPassword,
  tokenProvider,
  updateProfile,
} = createAuthProvider();
