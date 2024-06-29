import React, { useEffect, useState } from 'react';

export default function EventForm({ addEvent, selectedEvent, updateEvent }) {
    const [eventName, setEventName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if (selectedEvent) {
            setEventName(selectedEvent.eventName);
            setStartTime(new Date(selectedEvent.startTime).toISOString().slice(0, 16));
            setEndTime(new Date(selectedEvent.endTime).toISOString().slice(0, 16));
            setParticipants(selectedEvent.participants.map((p) => ({ value: p, label: `Person ${p}` })));
        }
    }, [selectedEvent]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newEvent = {
            eventName,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            participants: participants.map((p) => p.value)
        };

        if (selectedEvent) {
            updateEvent(newEvent);
        } else {
            addEvent(newEvent);
        }

        resetForm();
    };

    const resetForm = () => {
        setEventName('');
        setStartTime('');
        setEndTime('');
        setParticipants([]);
    };

    const handleParticipantChange = (e) => {
        const selectedOptions = Array.from(e.target.options).filter((option) => option.selected).map((option) => option.value);
        setParticipants(selectedOptions.map((value) => ({ value, label: `Person ${value}` })));
    };

    return (
        <div>
            <div>
                <h1>{selectedEvent ? 'Update Event' : 'Create Event'}</h1>

                <form onSubmit={handleSubmit}>
                    <label>Event Name</label>
                    <input type="text" id="event-name" value={eventName} onChange={(e) => setEventName(e.target.value)} required></input>

                    <label>Start Time</label>
                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required></input>

                    <label>End Time</label>
                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required></input>

                    <label>Select participants</label>
                    <select multiple value={participants.map((p) => p.value)} onChange={handleParticipantChange} required>
                        {[...Array(5).keys()].map((value) => (
                            <option key={value + 1} value={value + 1}>
                                Person {value + 1}
                            </option>
                        ))}
                    </select>

                    <button type="submit">{selectedEvent ? 'Update Event' : 'Create Event'}</button>
                </form>
            </div>
        </div>
    );
}
