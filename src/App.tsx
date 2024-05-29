import React from 'react';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import { NoteProvider } from './context/NoteContext';

const App: React.FC = () => {
  return (
    <NoteProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold m-4 text-center">Notes App</h1>
        <NoteForm />
        <SearchBar />
        <NoteList />
      </div>
    </NoteProvider>
  );
};

export default App;
