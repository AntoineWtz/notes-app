import React, { useState } from 'react';
import { useNotes } from '../services/noteService';

const NoteForm: React.FC = () => {
    const { addNote } = useNotes();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        addNote({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-4">Create a new note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded-md mb-2 outline-none"
                />
                <textarea
                    placeholder="Enter content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 rounded-md mb-2 outline-none"
                    rows={4}
                ></textarea>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Create Note
                </button>
            </form>
        </div>
    );
};

export default NoteForm;
