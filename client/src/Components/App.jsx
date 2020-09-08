import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Todos from './Todos';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Loading from './Loading';
import AddTodo from './AddTodo';
import ProtectedRoute from './ProtectedRoute';

import 'semantic-ui-css/semantic.min.css';
import '../css/App.css';

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact component={Todos} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <ProtectedRoute path="/add" exact component={AddTodo} />
          <Route>
            <Loading />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
