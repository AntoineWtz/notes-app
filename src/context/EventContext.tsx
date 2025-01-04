// context/EventContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

interface Event {
    id: string;
    title: string;
    date: string;
    timeSlot: string;
}

interface EventContextType {
    events: Event[];
    addOrUpdateEvent: (event: Omit<Event, 'id'>) => void;
    getEventForDate: (date: string) => Event | null;
    deleteEvent: (date: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>(() => {
        const savedEvents = localStorage.getItem('events');
        if (savedEvents) {
            return JSON.parse(savedEvents);
        }
    });

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addOrUpdateEvent = (event: Omit<Event, 'id'>) => {
        setEvents((prev) => {
            const updatedEvents = prev.filter((e) => e.date !== event.date);
            return [...updatedEvents, { ...event, id: Date.now().toString() }];
        });
    };

    const getEventForDate = (date: string): Event | null => {
        return events.find((event) => event.date === date) || null;
    };

    const deleteEvent = (date: string) => {
        setEvents((prev) => prev.filter((event) => event.date !== date));
    };

    return (
        <EventContext.Provider value={{ events, addOrUpdateEvent, getEventForDate, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};
