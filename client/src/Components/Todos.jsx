import React, { useState, useEffect } from 'react';
import {
  Header,
  List,
  Icon,
  Container,
  Message,
  Transition,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import Loading from '../Components/Loading';
import Navbar from '../Components/Navbar';

import { useAuthStore } from '../stores/authStore';
import { useTodoStore } from '../stores/todoStore';
import '../css/Todos.css';

const Todos = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  const { isAuth, fetchUser } = useAuthStore(); // add user

  const {
    todos,
    fetchAllTodos,
    updateTodo,
    toggleCompleted,
    deleteTodo,
  } = useTodoStore();

  useEffect(() => {
    (async () => {
      if (!isAuth) await fetchUser();
      await fetchAllTodos();
      setLoading(false);
    })();
  }, [fetchUser, fetchAllTodos, isAuth]);

  const handleTodoClick = async (todo) => {
    try {
      toggleCompleted(todo._id);
      await updateTodo(todo._id, { completed: !todo.completed });
    } catch (err) {
      setShowError(true);
    }
  };

  const handleDelete = async (todo) => {
    try {
      await deleteTodo(todo._id);
    } catch (err) {
      setShowError(true);
    }
  };

  if (loading) return <Loading />;

  if (!isAuth)
    return (
      <>
        <Navbar />
        <Header inverted as="h1" id="header">
          Todos
        </Header>
        <Message warning>
          <Message.Header>Sign In</Message.Header>
          <p>Please sign in to view your Todos</p>
        </Message>
      </>
    );

  return (
    <>
      <Navbar auth />

      <Transition visible={showError} animation="fade" duration={500}>
        <Message
          error
          header="Uh oh"
          content="Something went wrong on our end. Please try again later"
          onDismiss={() => setShowError(false)}
        />
      </Transition>
      <Header inverted as="h1" id="header">
        Todos
      </Header>
      {todos.length === 0 ? (
        <Transition visible={showMessage} animation="fade" duration={500}>
          <Message
            header="No Todos"
            content="Click the add todo button to add your first todo."
            onDismiss={() => setShowMessage(false)}
          />
        </Transition>
      ) : null}
      <Container>
        <List
          className="list-control"
          size="big"
          inverted
          selection
          verticalAlign="middle"
        >
          {todos.map((todo) => (
            <List.Item key={todo._id}>
              <Icon name="clipboard outline" color="grey" />
              <List.Content onClick={() => handleTodoClick(todo)}>
                <List.Header
                  style={{
                    textDecoration: todo.completed ? 'line-through' : '',
                    color: todo.completed ? '#8f8f8f' : 'white',
                  }}
                >
                  {todo.content}
                </List.Header>
              </List.Content>
              <Icon
                color="blue"
                link
                name="edit"
                onClick={() => history.push(`/edit/${todo._id}`)}
              />
              <Icon
                link
                name="close"
                color="red"
                onClick={() => handleDelete(todo)}
              />
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Todos;
