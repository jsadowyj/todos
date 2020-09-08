import React, { useState, useEffect } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

import Loading from './Loading';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuth, fetchUser } = useAuthStore();

  const [loading, setLoading] = useState(!isAuth);

  useEffect(() => {
    if (isAuth) return;
    (async () => {
      await fetchUser();
      setLoading(false);
    })();
  });

  if (loading) return <Loading />;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
