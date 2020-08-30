import React, { createContext, useState } from 'react';

export const TodosContext = createContext();

export const TodosProvider = (props) => {
  const [todos, setTodos] = useState([
    { title: 'Take out the trash', completed: false },
    { title: 'Walk the dog', completed: false },
    { title: 'Feed the fish', completed: false },
  ]);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {props.children}
    </TodosContext.Provider>
  );
};
