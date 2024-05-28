import React from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold m-4 text-center">Notes App</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
};

export default App;
