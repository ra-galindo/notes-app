import React, { useEffect, useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { fetchNotes } from './services/api';
import './App.css';


type Note = {
  id: number;
  title: string;
  content: string;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    loadNotes();
  }, []);

  const handleSave = (newNote: Note) => {
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="container">
      <h1>Notes App</h1>
      <NoteForm onSave={handleSave} />
      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
