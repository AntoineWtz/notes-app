import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';

const NoteItem: React.FC<{ note: { id: number; title: string; content: string; dateCreated: string } }> = ({ note }) => {
    const { deleteNote, updateNote } = useNotes();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);

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

    return (
        <div className="bg-backgroundLight shadow-md rounded-lg p-4 my-4 w-full max-w-lg mx-auto transition-all flex flex-col justify-between h-full">
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
                    <p className="text-sm text-textDark mb-2">
                        Créée le : {new Date(note.dateCreated).toLocaleDateString()}
                    </p>
                    <p className="text-textDark">{note.content}</p>
                </>
            )}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={handleEdit}
                    className="bg-accent1 text-textLight py-1 px-4 rounded-lg"
                >
                    {isEditing ? 'Sauvegarder' : 'Modifier'}
                </button>
                <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 text-textLight py-1 px-4 rounded-lg"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default NoteItem;
