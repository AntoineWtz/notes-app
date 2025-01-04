// components/Notes/NoteItem.tsx
import React, { useState } from 'react';
import { useNotes } from '../../context/NoteContext';
import { Trash2, CheckCircle } from 'lucide-react';

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
                    <p className="text-xs text-textDark mb-2">
                        {new Date(note.dateCreated).toLocaleDateString()}
                    </p>
                    <p className="text-textDark">{note.content}</p>
                </>
            )}
            <div className="flex justify-evenly mt-4">
                <button
                    onClick={() => deleteNote(note.id)}
                    className="flex items-center gap-2 bg-red-500 border border-transparent border-2 text-textLight py-1 px-4 rounded-lg hover:bg-backgroundDark hover:text-textWhite hover:border-backgroundDark transition-all"
                >
                    <Trash2 size={16} />
                    Supprimer
                </button>
                <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-transparent border border-backgroundDark border-2 text-textDark py-1 px-6 rounded-lg hover:bg-accent2 hover:border-transparent hover:text-textDark transition-all"
                >
                    <CheckCircle size={16} />
                    {isEditing ? 'Sauvegarder' : 'Modifier'}
                </button>
            </div>
        </div>
    );
};

export default NoteItem;
