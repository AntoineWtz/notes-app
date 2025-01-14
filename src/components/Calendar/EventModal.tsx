// components/Calendar/EventModal.tsx
import React, { useState, useEffect } from 'react';
import { useEvents } from '../../context/EventContext';
import { formatDateForDisplay } from '../../utils/DateUtils';
import { Trash2, XCircle, CheckCircle } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';

const predefinedColors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FF9F6E', '#A56DFF', '#FF77E9', '#59F9FF'];

interface EventModalProps {
    date: string;
    onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ date, onClose }) => {
    const { addOrUpdateEvent, getEventForDate, deleteEvent } = useEvents();
    const [title, setTitle] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [location, setLocation] = useState('');
    const [color, setColor] = useState(predefinedColors[0]);
    const [isExistingEvent, setIsExistingEvent] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    useEffect(() => {
        const existingEvent = getEventForDate(date);
        if (existingEvent) {
            setTitle(existingEvent.title);
            setTimeSlot(existingEvent.timeSlot);
            setLocation(existingEvent.location);
            setColor(existingEvent.color);
            setIsExistingEvent(true);
        } else {
            setTitle('');
            setTimeSlot('');
            setLocation('');
            setColor(predefinedColors[0]);
            setIsExistingEvent(false);
        }
    }, [date, getEventForDate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !timeSlot.trim() || !location.trim()) return;
        addOrUpdateEvent({ title, date, timeSlot, location, color });
        onClose();
    };

    const handleDelete = () => {
        setIsConfirmationOpen(true);
    };

    const confirmDelete = () => {
        deleteEvent(date);
        setIsConfirmationOpen(false);
        onClose();
    };

    const cancelDelete = () => {
        setIsConfirmationOpen(false);
    };

    const formattedDate = formatDateForDisplay(date);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-backgroundLight rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                    {isExistingEvent ? 'Modifier l’événement' : 'Ajouter un événement'}{' '}
                    <span className="text-sm text-gray-500">({formattedDate})</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring focus:ring-primary"
                    />
                    <input
                        type="text"
                        placeholder="Horaires"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring focus:ring-primary"
                    />
                    <input
                        type="text"
                        placeholder="Lieu"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring focus:ring-primary"
                    />
                    <div className="mb-4">
                        <div className="flex items-center justify-center gap-2">
                            {predefinedColors.map((presetColor) => (
                                <button
                                    key={presetColor}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border ${color === presetColor ? 'border-black' : 'border-gray-100'
                                        }`}
                                    style={{ backgroundColor: presetColor }}
                                    onClick={() => setColor(presetColor)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-evenly gap-2 sm:gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 bg-gray-300 text-gray-800 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition-all text-sm sm:text-base"
                        >
                            <XCircle size={16} />
                            Annuler
                        </button>
                        {isExistingEvent && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center gap-2 bg-red-500 text-textLight py-2 px-3 sm:px-4 rounded-lg hover:bg-red-600 transition-all text-sm sm:text-base"
                            >
                                <Trash2 size={16} />
                                Supprimer
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-backgroundDark text-textLight py-2 px-3 sm:px-4 rounded-lg hover:bg-accent2 hover:text-textDark transition-all text-sm sm:text-base"
                        >
                            <CheckCircle size={16} />
                            {isExistingEvent ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
            {isConfirmationOpen && (
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    title="Supprimer l'événement"
                    message="Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible."
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export default EventModal;
