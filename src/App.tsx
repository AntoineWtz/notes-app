import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotesPage from './components/Pages/NotesPage';
import CalendarPage from './components/Pages/CalendarPage';
import HomePage from './components/Pages/HomePage';
import { NoteProvider } from './context/NoteContext';
import { EventProvider } from './context/EventContext';

const App: React.FC = () => {
  return (
    <NoteProvider>
      <EventProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </EventProvider>
    </NoteProvider>
  );
};

export default App;
