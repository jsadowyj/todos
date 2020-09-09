import React, { useState, useEffect } from 'react';

import { Container } from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';

import { useTodoStore } from '../stores/todoStore';

import Navbar from './Navbar';
import EditForm from './TodoForm';
import Loading from './Loading';

import '../css/AddTodo.css';

const EditTodo = ({ match }) => {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);

  const { todos, fetchAllTodos, updateTodo } = useTodoStore();

  useEffect(() => {
    (async () => {
      await fetchAllTodos();
      setLoading(false);
    })();
  }, [fetchAllTodos]);

  const history = useHistory();

  const [content, setContent] = useState('');

  const [showError, setShowError] = useState(false);

  if (loading) return <Loading />;

  const matchingTodo = todos.find((todo) => todo._id === id);

  const handleSubmit = async () => {
    try {
      await updateTodo(id, { content });
      history.push('');
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <>
      <Navbar auth />
      <Container>
        <EditForm
          label={'Edit Todo'}
          error={[showError, setShowError]}
          handleSubmit={handleSubmit}
          content={[content, setContent]}
          buttonText="Update"
          placeholder={matchingTodo ? matchingTodo.content : ''}
        />
      </Container>
    </>
  );
};

export default EditTodo;
