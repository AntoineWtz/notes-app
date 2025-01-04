import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Diff } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className="text-center py-12">
            <h1 className="text-5xl font-bold text-primary mb-6">My Office</h1>
            <p className="text-lg text-textLight mb-8">
                Une application simple et intuitive pour organiser votre quotidien.
            </p>
            <div className="flex justify-center gap-6">
                <Link
                    to="/notes"
                    className="flex items-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent1 transition duration-200"
                >
                    <Diff size={16} />
                    Accéder aux Notes
                </Link>
                <Link
                    to="/calendar"
                    className="flex items-center gap-2 bg-accent1 text-white py-3 px-6 rounded-lg hover:bg-secondary hover:text-textDark transition duration-200"
                >
                    <CalendarDays size={16} />
                    Accéder au Calendrier
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
