// SearchBar.tsx
import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <div className="flex items-center bg-white shadow-md rounded-md p-2 mb-4">
            <input type="text" placeholder="Search notes..." className="flex-1 p-2 outline-none" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Search</button>
        </div>
    );
};

export default SearchBar;
