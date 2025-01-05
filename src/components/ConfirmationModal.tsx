// components/ConfirmationModal.tsx
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4 text-textDark">{title}</h2>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <div className="flex justify-evenly gap-4">
                    <button
                        onClick={onCancel}
                        className="flex items-center gap-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all"
                    >
                        <XCircle size={16} />
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center gap-2 bg-backgroundDark text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-all"
                    >
                        <CheckCircle size={16} />
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
