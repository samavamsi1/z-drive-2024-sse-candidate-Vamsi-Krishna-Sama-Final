import React from 'react'


export default function EventList({events,  selectEvent}){
    
    return (
        <div>
            <h2>Event list</h2>
            {events.length > 0 ? (
                events.map((event ,index) => (
                    <div key={index} className='event'>
                        <h3 onClick={() => selectEvent(index)} >{event.eventName}</h3>
                    </div>
                )) ) : ( <p>No events avilable</p> )
            }
        </div>
    )

}