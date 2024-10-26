import React from 'react';
import { deleteNote } from '../services/api';
import NoteItem from './NoteItem';

type Note = {
  id: number;
  title: string;
  content: string;
};

type NoteListProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const NoteList: React.FC<NoteListProps> = ({ notes, setNotes }) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={() => handleDelete(note.id)} />
      ))}
    </div>
  );
};

export default NoteList;
