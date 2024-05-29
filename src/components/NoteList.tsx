import React from 'react';
import { useNotes } from '../context/NoteContext';
import NoteItem from './NoteItem';

const NoteList: React.FC = () => {
    const { notes } = useNotes();

    return (
        <div className="flex flex-wrap flex-col justify-evenly lg:flex-row">
            {notes.length > 0 ? (
                notes.map(note => <NoteItem key={note.id} note={note} />)
            ) : (
                <p className="text-center text-gray-500">No notes available</p>
            )}
        </div>
    );
};

export default NoteList;
