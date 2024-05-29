import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface NoteContextProps {
    notes: Note[];
    addNote: (note: Omit<Note, 'id'>) => void;
    deleteNote: (id: number) => void;
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
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Omit<Note, 'id'>) => {
        const newNote = { ...note, id: Date.now() };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const deleteNote = (id: number) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
    );
};
