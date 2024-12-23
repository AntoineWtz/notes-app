// context/NoteContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
    dateCreated: string; // Nouvelle propriété
}

interface NoteContextProps {
    notes: Note[];
    filteredNotes: Note[];
    addNote: (note: Omit<Note, 'id' | 'dateCreated'>) => void;
    updateNote: (note: Note) => void;
    deleteNote: (id: number) => void;
    searchNotes: (query: string) => void;
}

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

export const useNotes = (): NoteContextProps => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within a NoteProvider');
    }
    return context;
};

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });
    const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
        setFilteredNotes(notes);
    }, [notes]);

    const addNote = (note: Omit<Note, 'id' | 'dateCreated'>) => {
        const newNote = {
            ...note,
            id: Date.now(),
            dateCreated: new Date().toISOString(), // Enregistre la date actuelle
        };
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes, newNote];
            setFilteredNotes(updatedNotes);
            return updatedNotes;
        });
    };

    const updateNote = (updatedNote: Note) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            );
            setFilteredNotes(updatedNotes);
            return updatedNotes;
        });
    };

    const deleteNote = (id: number) => {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.filter(note => note.id !== id);
            setFilteredNotes(updatedNotes);
            return updatedNotes;
        });
    };

    const searchNotes = (query: string) => {
        setFilteredNotes(notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        ));
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                filteredNotes,
                addNote,
                updateNote,
                deleteNote,
                searchNotes,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};
