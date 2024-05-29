import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';

const SearchBar: React.FC = () => {
    const { searchNotes } = useNotes();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        searchNotes(e.target.value);
    };

    return (
        <div className="mt-12 mb-12 m-4 p-4 bg-purple-100 shadow-lg rounded-xl">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search notes..."
                className="w-full p-2 rounded-md outline-none"
            />
        </div>
    );
};

export default SearchBar;
