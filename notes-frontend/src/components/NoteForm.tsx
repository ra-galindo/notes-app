import React, { useState } from 'react';
import { createNote } from '../services/api';

type NoteFormProps = {
  onSave: (note: { id: number; title: string; content: string }) => void;
};

const NoteForm: React.FC<NoteFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      try {
        const newNote = await createNote({ title, content });
        onSave(newNote);
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Failed to save note:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
