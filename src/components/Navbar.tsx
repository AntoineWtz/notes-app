// components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/note-collante.png';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-backgroundDark text-textLight py-4 px-6 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={Logo} alt="logo" className="h-8 w-8" />
                </Link>

                <button
                    onClick={toggleMenu}
                    className="sm:hidden text-textLight focus:outline-none"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul
                    className={`flex flex-col sm:flex-row sm:gap-12 sm:items-center fixed sm:static top-16 left-0 w-full sm:w-auto bg-backgroundDark transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden sm:flex'
                        }`}
                >
                    <li className="text-center sm:text-left mb-2">
                        <Link
                            to="/"
                            className="block py-2 px-6 sm:px-0 sm:py-0 hover:text-secondary transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Accueil
                        </Link>
                    </li>
                    <li className="text-center sm:text-left mb-2">
                        <Link
                            to="/notes"
                            className="block py-2 px-6 sm:px-0 sm:py-0 hover:text-secondary transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Notes
                        </Link>
                    </li>
                    <li className="text-center sm:text-left mb-2">
                        <Link
                            to="/calendar"
                            className="block py-2 px-6 sm:px-0 sm:py-0 hover:text-secondary transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Calendrier
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
