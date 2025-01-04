// components/Pages/NotesPage.tsx
import React, { useState } from 'react';
import NoteModal from '../Notes/NoteModal';
import SearchBar from '../Notes/SearchBar';
import NoteList from '../Notes/NoteList';
import { Diff } from 'lucide-react';

const NotesPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="mt-20">
            <h1 className="text-3xl lg:text-4xl font-bold m-4 text-center text-primary">Mes Notes</h1>
            <p className="text-base lg:text-lg text-center text-textLight mb-8">
                Ajoutez et organisez vos notes facilement.
            </p>
            <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-accent1 to-secondary text-textLight py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition duration-200 mx-auto block"
            >
                <Diff size={16} />
                Créer une note
            </button>
            <div className="mx-2">
                <SearchBar />
            </div>
            <div className="mx-2">
                <NoteList />
            </div>
            {isModalOpen && <NoteModal onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default NotesPage;
