import React from 'react';

type NoteItemProps = {
  note: { id: number; title: string; content: string };
  onDelete: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default NoteItem;
