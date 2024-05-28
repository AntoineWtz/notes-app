// NoteItem.tsx
import React from 'react';

interface NoteItemProps {
    title: string;
    content: string;
}

const NoteItem: React.FC<NoteItemProps> = ({ title, content }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

export default NoteItem;
