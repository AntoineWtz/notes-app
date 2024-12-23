import React, { useState } from 'react';
import NoteModal from './components/NoteModal';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import { NoteProvider } from './context/NoteContext';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <NoteProvider>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-4xl font-bold m-4 text-center text-primary">Notes App</h1>
          <p className="text-center text-textLight mb-8">
            Ajouter et trouver rapidement vos notes
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-primary to-accent1 text-textLight py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition duration-200 mx-auto block"
          >
            Créer une note
          </button>
          <SearchBar />
          <NoteList />
          {isModalOpen && <NoteModal onClose={() => setModalOpen(false)} />}
        </div>
        <Footer />
      </div>
    </NoteProvider>
  );
};

export default App;
