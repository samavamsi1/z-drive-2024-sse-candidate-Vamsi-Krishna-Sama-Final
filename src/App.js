import React, { useEffect, useState } from "react";
import "./style.css";
import Calender from './component/Calendar'; // Corrected typo in import
import EventForm from "./component/EventForm";
import EventList from "./component/EventList";

export default function App() {
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
    const [selectedEventIndex, setSelectedEventIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addEvent = (newEvent) => {
        const updatedEvents = [...events];

        if (checkConflict(newEvent)) {
            updatedEvents.push({...newEvent, conflict: true});
        } else {
            updatedEvents.push(newEvent);
        }
        setEvents(updatedEvents);
    };

    const updateEvent = (updatedEvent) => {
        const updatedEvents = events.map((event, index) =>
            index === selectedEventIndex ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setSelectedEventIndex(null);
    };

    const deleteEvent = (index) => {
        setEvents(events.filter((_, i) => i !== index));
    };

    const selectEvent = (index) => {
        setSelectedEventIndex(index);
    };

    const checkConflict = (newEvent) => {
        return events.some((event) =>
            event.participants.some((participant) =>
                newEvent.participants.includes(participant)
            ) &&
            ((newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
            (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime) ||
            (newEvent.startTime <= event.startTime && newEvent.endTime >= event.endTime))
        );
    };

    return (
        <div>
            <h1>Calendar</h1>
            <Calendar events={events} deleteEvent={deleteEvent}></Calendar>
            <EventList events={events} selectEvent={selectEvent}></EventList>
            <EventForm
                addEvent={addEvent}
                selectedEvent={selectedEventIndex !== null ? events[selectedEventIndex] : null}
                updateEvent={updateEvent}
            ></EventForm>
        </div>
    );
}
