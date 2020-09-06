import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Todos from './Todos';
import SignIn from './SignIn';
import SignUp from './SignUp';

import { TodosProvider } from '../contexts/TodosContext';

import 'semantic-ui-css/semantic.min.css';
import '../css/App.css';

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <TodosProvider>
              <Todos />
            </TodosProvider>
          </Route>
          <Route path="/login" exact component={SignIn} />
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
