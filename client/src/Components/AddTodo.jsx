import React, { useState } from 'react';

import { Container } from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';

import { useTodoStore } from '../stores/todoStore';

import Navbar from './Navbar';
import AddForm from './TodoForm';

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
        <AddForm
          error={[showError, setShowError]}
          handleSubmit={handleSubmit}
          content={[content, setContent]}
          buttonText="Add"
        />
      </Container>
    </>
  );
};

export default AddTodo;
