import React, { useContext } from 'react';
import uuid from 'react-uuid';
import { Header, List, Icon, Container } from 'semantic-ui-react';

import '../css/Todos.css';

import { TodosContext } from '../contexts/TodosContext';
import { Link, useHistory } from 'react-router-dom';

const Todos = () => {
  const history = useHistory();

  const [todos, setTodos] = useContext(TodosContext);

  const handleTodoClick = (todo) => {
    setTodos(
      todos.map((t) =>
        t.title === todo.title ? { ...todo, completed: !todo.completed } : t
      )
    );
  };

  return (
    <>
      <Header inverted as="h1" id="header">
        Todos
      </Header>
      <Container>
        <List
          className="list-control"
          size="big"
          inverted
          selection
          verticalAlign="middle"
        >
          {todos.map((todo) => (
            <List.Item key={uuid()}>
              <Icon name="clipboard outline" color="grey" />
              <List.Content>
                <List.Header
                  style={{
                    textDecoration: todo.completed ? 'line-through' : '',
                    color: todo.completed ? '#8f8f8f' : 'white',
                  }}
                  onClick={() => handleTodoClick(todo)}
                >
                  {todo.title}
                </List.Header>
              </List.Content>
              <Icon
                color="blue"
                link
                name="edit"
                onClick={() => history.push('/edit/1')}
              />
              <Icon
                link
                name="close"
                color="red"
                onClick={() => history.push('/delete/1')}
              />
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Todos;
