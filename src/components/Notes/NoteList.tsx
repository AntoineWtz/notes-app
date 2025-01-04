// components/Notes/NoteList.tsx
import React from 'react';
import { useNotes } from '../../context/NoteContext';
import NoteItem from './NoteItem';

const NoteList: React.FC = () => {
    const { filteredNotes } = useNotes();

    const sortedNotes = [...filteredNotes].sort(
        (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );

    return (
        <div className="flex flex-wrap flex-col justify-evenly lg:flex-row">
            {sortedNotes.length > 0 ? (
                sortedNotes.map((note) => <NoteItem key={note.id} note={note} />)
            ) : (
                <p className="text-center text-gray-500">Pas de notes disponibles</p>
            )}
        </div>
    );
};

export default NoteList;
