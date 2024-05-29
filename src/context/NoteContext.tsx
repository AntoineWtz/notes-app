import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface NoteContextProps {
    notes: Note[];
    filteredNotes: Note[];
    addNote: (note: Omit<Note, 'id'>) => void;
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

    const addNote = (note: Omit<Note, 'id'>) => {
        const newNote = { ...note, id: Date.now() };
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes, newNote];
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
        <NoteContext.Provider value={{ notes, filteredNotes, addNote, deleteNote, searchNotes }}>
            {children}
        </NoteContext.Provider>
    );
};
