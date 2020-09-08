import React from 'react';
import { Loader, Container } from 'semantic-ui-react';

import Navbar from './Navbar';

const Loading = () => {
  return (
    <>
      <Navbar auth />
      <Container>
        <Loader size="large" active></Loader>
      </Container>
    </>
  );
};

export default Loading;
