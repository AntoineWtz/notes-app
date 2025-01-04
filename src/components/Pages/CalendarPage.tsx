// components/pages/CalendarPage.tsx
import React from 'react';
import CalendarComponent from '../Calendar/CalendarComponent';

const CalendarPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold m-4 text-center text-primary">Calendrier</h1>
            <p className="text-center text-textLight mb-8">
                Planifiez vos rendez-vous et vos tâches importantes.
            </p>
            <CalendarComponent />
        </div>
    );
};

export default CalendarPage;
