import React from 'react';
import { Loader, Container } from 'semantic-ui-react';

const Loading = () => {
  return (
    <Container>
      <Loader size="large" active></Loader>
    </Container>
  );
};

export default Loading;
