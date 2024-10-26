import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update this if needed
});

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Example usage in an axios call:
axios.get(`${apiUrl}/notes`).then(response => {
  // handle response
});


export const fetchNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (data: { title: string; content: string }) => {
  const response = await api.post('/notes', data);
  return response.data; // Return the newly created note with the ID
};

export const deleteNote = async (id: number) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
