import React from 'react';

export default function Calendar = ({ events, deleteEvent }) => {
    return (
        <div>
            <h2>Scheduled Events</h2>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index} className={`event ${event.conflict ? 'conflict' : ''}`}>
                        <h3>{event.eventName}</h3>
                        <p>Start: {new Date(event.startTime).toLocaleString()}</p>
                        <p>End: {new Date(event.endTime).toLocaleString()}</p>
                        {event.conflict && <p className="conflict-message">Conflict Detected!</p>}
                        <button onClick={() => deleteEvent(index)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No events available</p>
            )}
        </div>
    );
};
