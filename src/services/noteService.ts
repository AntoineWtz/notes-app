import { useState, useEffect } from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    const addNote = (note: Omit<Note, 'id'>) => {
        const newNote = { ...note, id: Date.now() };
        setNotes([...notes, newNote]);
    };

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const searchNotes = (query: string) => {
        setFilteredNotes(notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        ));
    };

    return {
        notes: filteredNotes,
        addNote,
        deleteNote,
        searchNotes
    };
};
