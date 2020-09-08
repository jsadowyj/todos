import React, { useState } from 'react';

import {
  Container,
  Form,
  Button,
  Message,
  Transition,
} from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';

import { useTodoStore } from '../stores/todoStore';

import Navbar from './Navbar';

import '../css/AddTodo.css';

const AddTodo = () => {
  const history = useHistory();

  const [content, setContent] = useState('');

  const [showError, setShowError] = useState(false);

  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = async () => {
    try {
      await addTodo({ content });
      history.push('');
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <>
      <Navbar auth />
      <Container>
        <Form id="add-todo" inverted size="huge">
          <Transition visible={showError} animation="fade" duration={500}>
            <Message
              size="mini"
              error
              header="Uh oh"
              content="Could not properly complete request. Please try again later"
              onDismiss={() => setShowError(false)}
            />
          </Transition>
          <Form.Input
            name="todo"
            label="Todo"
            placeholder="Walk the dog"
            value={content}
            onChange={(e, { value }) => setContent(value)}
          />
          <Button
            onClick={handleSubmit}
            disabled={content.length === 0}
            primary
            fluid
            size="large"
          >
            Add
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddTodo;
