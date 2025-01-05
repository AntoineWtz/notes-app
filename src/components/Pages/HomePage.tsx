import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, StickyNote } from 'lucide-react';
import { useNotes } from '../../context/NoteContext';
import { useEvents } from '../../context/EventContext';

const HomePage: React.FC = () => {
    const { filteredNotes } = useNotes();
    const { events } = useEvents();

    const latestNotes = [...filteredNotes]
        .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
        .slice(0, 3);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = [...events]
        .filter((event) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);

    return (
        <div className="text-center py-12 mt-10 sm:mt-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">My Office</h1>
            <p className="text-base lg:text-lg text-textLight mb-8">
                Une application simple et intuitive pour organiser votre quotidien.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 lg:gap-6 mb-12 max-w-4xl mx-auto">
                <Link
                    to="/notes"
                    className="flex items-center gap-2 bg-primary text-white py-2 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-accent1 transition duration-200 text-sm lg:text-base max-w-[200px] mx-auto"
                >
                    <StickyNote size={16} />
                    Mes Notes
                </Link>
                <Link
                    to="/calendar"
                    className="flex items-center gap-2 bg-accent1 text-white py-2 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-secondary hover:text-textDark transition duration-200 text-sm lg:text-base max-w-[200px] mx-auto"
                >
                    <CalendarDays size={16} />
                    Mon Calendrier
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 sm:px-6">
                {/* Dernières Notes */}
                <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-primary mb-4">Dernières Notes</h2>
                    {latestNotes.length > 0 ? (
                        <ul className="space-y-6">
                            {latestNotes.map((note) => (
                                <li key={note.id} className="border-b pb-4">
                                    <h3 className="text-lg font-semibold text-textDark text-left">{note.title}</h3>
                                    <p className="text-sm text-gray-700 text-left truncate">{note.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucune note disponible.</p>
                    )}
                </div>

                {/* Prochains Événements */}
                <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-primary mb-4">Prochains Événements</h2>
                    {upcomingEvents.length > 0 ? (
                        <ul className="space-y-6">
                            {upcomingEvents.map((event) => (
                                <li key={event.id} className="flex gap-4 items-center border-b pb-4">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: event.color }}
                                    ></div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-textDark">{event.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(event.date).toLocaleDateString()} - {event.timeSlot}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucun événement à venir.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
