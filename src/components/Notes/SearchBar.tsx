// components/Notes/SearchBar.tsx
import React, { useState } from 'react';
import { useNotes } from '../../context/NoteContext';

const SearchBar: React.FC = () => {
    const { searchNotes } = useNotes();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        searchNotes(e.target.value);
    };

    return (
        <div className="relative sm:w-1/2 m-8 lg:w-1/2 mx-auto">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                className="bg-backgroundLight w-full p-3 rounded-lg shadow focus:ring focus:ring-accent2"
                placeholder="Rechercher une note..."
            />
        </div>
    );
};

export default SearchBar;
