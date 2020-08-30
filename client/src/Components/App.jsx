import React from 'react';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';
import Todos from './Todos';

import { TodosProvider } from '../contexts/TodosContext';

import 'semantic-ui-css/semantic.min.css';
import '../css/App.css';

const App = () => {
  return (
    <>
      <Container>
        <Navbar />
        <TodosProvider>
          <Todos />
        </TodosProvider>
      </Container>
    </>
  );
};

export default App;
