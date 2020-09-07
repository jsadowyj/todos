import create from 'zustand';
import axios from 'axios';

export const useTodoStore = create((set, get) => ({
  todos: null, // [{ content: 'asd', completed: true/false }]
  setTodos: (todos) => set({ todos }),
  fetchAllTodos: async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) return console.error('No auth token');

    try {
      const { data } = await axios.get('/api/todos', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      set({ todos: data.todos });
      return data.todos;
    } catch (err) {
      console.error(err.response);
      return err.response;
    }
  },
  updateTodo: async (id, { content, completed }) => {
    if (!id) return console.error('No id specified');
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) return console.error('No auth token');

      const todos = get().todos;
      if (todos === null) return console.error('No todos found');

      const todo = todos.find((todo) => todo._id.toString() === id.toString());
      if (!todo) return console.error('Todo id invalid');

      const { data } = await axios.put(
        `/api/todos/${todo._id}`,
        {
          content,
          completed, // completed !== undefined ? completed : !todo.completed
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return data;
    } catch (err) {
      console.error(err);
      console.log(err.message);
      throw err;
    }
  },
  toggleCompleted: (id) => {
    if (!id) return console.error('No id specified');

    const todos = get().todos;
    if (todos === null) return console.error('No todos found');

    return set({
      todos: todos.map((t) =>
        t._id.toString() === id.toString()
          ? { ...t, completed: !t.completed }
          : t
      ),
    });
  },
}));
