// components/Notes/NoteModal.tsx
import React, { useState } from 'react';
import { useNotes } from '../../context/NoteContext';
import { CheckCircle, XCircle } from 'lucide-react';

interface NoteModalProps {
    onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose }) => {
    const { addNote } = useNotes();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        addNote({ title, content });
        setTitle('');
        setContent('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4 text-textDark">Nouvelle note</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-300 focus:ring focus:ring-accent1"
                        placeholder="Titre de la note"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 mb-3 rounded-md border border-gray-300 resize-none focus:ring-2 focus:ring-accent1"
                        rows={4}
                        placeholder="Contenu de la note"
                    ></textarea>
                    <div className="flex justify-evenly gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 bg-gray-300 text-textDark py-2 px-4 rounded-lg hover:bg-gray-200"
                        >
                            <XCircle size={16} />
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-backgroundDark text-textLight py-2 px-4 rounded-lg hover:bg-accent2 hover:text-textDark transition-all"
                        >
                            <CheckCircle size={16} />
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
