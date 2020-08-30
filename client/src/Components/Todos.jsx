import React, { useContext } from 'react';
import uuid from 'react-uuid';
import { Header, List, Icon } from 'semantic-ui-react';

import { TodosContext } from '../contexts/TodosContext';

const Todos = () => {
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
      <Header inverted as="h2">
        Todos:
      </Header>
      <List className="list-control" inverted selection>
        {todos.map((todo) => (
          <List.Item key={uuid()} onClick={() => handleTodoClick(todo)}>
            <Icon name="clipboard outline" />
            <List.Content>
              <List.Header
                style={{
                  textDecoration: todo.completed ? 'line-through' : '',
                  color: todo.completed ? '#8f8f8f' : 'white',
                }}
              >
                {todo.title}
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default Todos;
