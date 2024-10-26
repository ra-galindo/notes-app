import axios from 'axios';

// Set the base URL from the environment variable or a default for local development
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
});

// API functions using the configured `api` instance

export const fetchNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (data: { title: string; content: string }) => {
  const response = await api.post('/notes', data);
  return response.data;
};

export const deleteNote = async (id: number) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
