// NoteDetail.tsx
import React from 'react';

interface NoteDetailProps {
    title: string;
    content: string;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ title, content }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

export default NoteDetail;
