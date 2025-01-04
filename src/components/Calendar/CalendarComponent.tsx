// components/Calendar/CalendarComponent.tsx
import React, { useState } from 'react';
import { useEvents } from '../../context/EventContext';
import EventModal from './EventModal';
import { formatDateToISO } from '../../utils/DateUtils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CalendarComponent: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { events, getEventForDate, deleteEvent } = useEvents();

    const handleMonthChange = (direction: number) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    const getDaysInMonth = (year: number, month: number) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);

        const firstDayIndex = (firstDay.getDay() + 6) % 7;
        const daysBefore = Array.from({ length: firstDayIndex }, () => null);

        const totalDays = [...daysBefore, ...daysInMonth];

        while (totalDays.length % 7 !== 0) {
            totalDays.push(null);
        }

        return totalDays;
    };

    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    return (
        <div className="p-4 bg-backgroundLight shadow-lg rounded-2xl mx-auto">
            <div className="flex justify-evenly items-center mb-6">
                <button
                    onClick={() => handleMonthChange(-1)}
                    className="flex items-center gap-2 bg-primary text-textLight py-2 px-4 rounded-lg hover:bg-backgroundDark transition-all"
                >
                    <ArrowLeft size={16} />
                    Mois précédent
                </button>
                <h2 className="text-2xl capitalize font-thin text-textDark">
                    {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                    onClick={() => handleMonthChange(1)}
                    className="flex items-center gap-2 bg-primary text-textLight py-2 px-4 rounded-lg hover:bg-backgroundDark transition-all"
                >
                    Mois suivant
                    <ArrowRight size={16} />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-3 text-center">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                    <div key={day} className="font-thin text-textDark">
                        {day}
                    </div>
                ))}
                {daysInMonth.map((day, index) => {
                    const date = day
                        ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                        : null;

                    const dailyEvent = date ? getEventForDate(formatDateToISO(date)) : null;

                    return (
                        <div
                            key={index}
                            className={`p-4 text-left rounded-xl ${day
                                ? 'bg-white border border-gray-300 shadow-md cursor-pointer hover:bg-gray-100 hover:text-textDark transition-all'
                                : 'bg-gray-100'
                                }`}
                            onClick={() => {
                                if (date) {
                                    setSelectedDate(formatDateToISO(date));
                                    setIsModalOpen(true);
                                }
                            }}
                        >
                            {day ? (
                                <>
                                    <p className="font-bold">{day}</p>
                                    {dailyEvent && (
                                        <p className="text-gray-500">
                                            {dailyEvent.timeSlot} - {dailyEvent.title}
                                        </p>
                                    )}
                                </>
                            ) : null}
                        </div>
                    );
                })}
            </div>
            {isModalOpen && selectedDate && (
                <EventModal date={selectedDate} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default CalendarComponent;
