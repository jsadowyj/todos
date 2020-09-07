import create from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set, get) => ({
  isAuth: false,
  authToken: null,
  user: null,
  fetchUser: async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) return console.log('no token'); // no token
    try {
      const { data } = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({ user: data, isAuth: true, authToken });
      return authToken;
    } catch (err) {
      console.error(err);
      if (err.response) return console.log(err.response);
    }
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ isAuth: false, authToken: null });
  },
}));
