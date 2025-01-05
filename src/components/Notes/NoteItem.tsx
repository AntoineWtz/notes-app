// components/Notes/NoteItem.tsx
import React, { useState } from 'react';
import { useNotes } from '../../context/NoteContext';
import { Trash2, CheckCircle } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';

const NoteItem: React.FC<{ note: { id: number; title: string; content: string; dateCreated: string } }> = ({ note }) => {
    const { deleteNote, updateNote } = useNotes();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleEdit = () => {
        if (isEditing) {
            updateNote({
                id: note.id,
                title: editTitle,
                content: editContent,
                dateCreated: note.dateCreated,
            });
        }
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        deleteNote(note.id);
        setModalOpen(false);
    };

    return (
        <div className="bg-backgroundLight shadow-md rounded-2xl p-4 my-4 w-full max-w-lg mx-auto transition-all flex flex-col justify-between h-full">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full p-2 mb-2 border rounded-md focus:ring focus:ring-accent2"
                    />
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 mb-2 border rounded-md resize-none focus:ring-2 focus:ring-accent2"
                        rows={Math.max(4, editContent.split('\n').length)}
                    />
                </>
            ) : (
                <>
                    <h3 className="text-xl font-bold mb-2 text-textDark">{note.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{new Date(note.dateCreated).toLocaleDateString()}</p>
                    <p
                        className="text-textDark whitespace-pre-wrap"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {note.content}
                    </p>
                </>
            )}
            <div className="flex justify-evenly mt-4 gap-2 sm:gap-4">
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                >
                    <Trash2 size={16} />
                    Supprimer
                </button>
                <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-transparent border border-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                >
                    <CheckCircle size={16} />
                    {isEditing ? 'Sauvegarder' : 'Modifier'}
                </button>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirmer la suppression"
                message="Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible."
                onConfirm={handleDelete}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    );
};

export default NoteItem;
