// components/pages/CalendarPage.tsx
import React from 'react';
import CalendarComponent from '../Calendar/CalendarComponent';

const CalendarPage: React.FC = () => {
    return (
        <div className="mt-20 mx-2">
            <h1 className="text-3xl lg:text-4xl font-bold m-4 text-center text-primary">Calendrier</h1>
            <p className="text-base lg:text-lg text-center text-textLight mb-8">
                Planifiez vos rendez-vous et vos tâches importantes.
            </p>
            <CalendarComponent />
        </div>
    );
};

export default CalendarPage;
