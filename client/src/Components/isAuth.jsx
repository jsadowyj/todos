import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Loader } from 'semantic-ui-react';

const isAuth = (props) => {
  const { isAuth, fetchUser } = useAuthStore();

  return isAuth ? <Loader /> : <>props.children</>;
};

export default isAuth;
