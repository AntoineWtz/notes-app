import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-backgroundDark text-textLight py-4 px-6">
            <ul className="flex justify-center gap-12">
                <li>
                    <Link to="/" className="hover:text-secondary transition">Accueil</Link>
                </li>
                <li>
                    <Link to="/notes" className="hover:text-secondary transition">Notes</Link>
                </li>
                <li>
                    <Link to="/calendar" className="hover:text-secondary transition">Calendrier</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
