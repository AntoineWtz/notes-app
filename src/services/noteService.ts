import React, { useState } from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Omit<Note, 'id'>) => {
        const newNote: Note = { ...note, id: notes.length + 1 };
        setNotes([...notes, newNote]);
    };

    // Ajoutez d'autres opérations CRUD si nécessaire

    return { notes, addNote };
};
