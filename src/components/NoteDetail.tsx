import React from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface NoteDetailProps {
    note: Note;
    onClose: () => void;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
                <p className="mb-4">{note.content}</p>
                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NoteDetail;
