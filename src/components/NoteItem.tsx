import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';

const NoteItem: React.FC<{ note: { id: number, title: string, content: string } }> = ({ note }) => {
    const { deleteNote } = useNotes();

    return (
        <div className="bg-green-100 shadow-md rounded-md p-4 m-4 min-w-64">
            <h3 className="text-xl font-bold mb-2">{note.title}</h3>
            <p className="text-gray-700 mb-4">{note.content}</p>

            <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded duration-200 block mx-auto"
            >
                Delete
            </button>
        </div>
    );
};

export default NoteItem;
