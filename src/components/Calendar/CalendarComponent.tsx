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
    const { getEventForDate } = useEvents();

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
        <div className="p-6 bg-backgroundLight shadow-lg rounded-2xl mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
                <button
                    onClick={() => handleMonthChange(-1)}
                    className="text-sm flex items-center gap-2 border border-backgroundDark bg-transparent text-textDark py-2 px-3 sm:px-4 rounded-lg hover:bg-backgroundDark hover:text-textLight transition-all"
                >
                    <ArrowLeft size={16} />
                    Précédent
                </button>
                <h2 className="text-lg sm:text-2xl capitalize font-thin text-textDark">
                    {currentMonth.toLocaleString('fr-FR', { month: 'long' })}
                </h2>
                <button
                    onClick={() => handleMonthChange(1)}
                    className="text-sm flex items-center gap-2 border border-backgroundDark bg-transparent text-textDark py-2 px-3 sm:px-4 rounded-lg hover:bg-backgroundDark hover:text-textLight transition-all"
                >
                    Suivant
                    <ArrowRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-3 text-center text-xs sm:text-sm">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                    <div key={day} className="font-bold text-textDark">
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
                            className={`relative p-3 text-left rounded-lg ${day
                                ? 'bg-white border border-gray-300 shadow cursor-pointer hover:bg-gray-50 hover:text-textDark hover:shadow-md transition-all'
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
                                    <p className="absolute top-2 left-2 text-sm sm:text-base font-bold">
                                        {day}
                                    </p>

                                    {dailyEvent && (
                                        <div
                                            className="absolute top-2 right-2 w-3 h-3 rounded-full"
                                            style={{ backgroundColor: dailyEvent.color }}
                                        ></div>
                                    )}

                                    {dailyEvent && (
                                        <div className="hidden sm:block mt-6 text-xs sm:text-sm text-textDark">
                                            <p className="font-semibold truncate">{dailyEvent.title}</p>
                                            <p className="text-gray-500 italic truncate">
                                                {dailyEvent.timeSlot}
                                            </p>
                                            <p className="text-gray-400 text-xs truncate">
                                                {dailyEvent.location}
                                            </p>
                                        </div>
                                    )}
                                    <p className="mt-6 text-gray-400 text-xs truncate"></p>
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
