import React, { useEffect, useState } from "react";
import "./style.css";
import Calender from './component/Calender';
import EventForm from "./component/EventForm";
import EventList from "./component/EventList";



export default function App() {
    const [events,  setEvents] = useState(JSON.parse(  localStorage.getItem('events') || []));
    const [selectedEventIndex , setSelectedEventIndex] = useState(null);
    

    useEffect(() => {
     localStorage.setItem('events' , JSON.stringify(events))
    }, [events])


    const addEvent  = (newEvent) => {
      const updatedEvents = [...newEvent];

      if(checkConflict(newEvent)){
        updatedEvents.push({...newEvent , conflict : true})
      }else{
        updatedEvents.push(newEvent);
      }
      setEvents(updatedEvents);
 
    }

    const updateEvent = () => {
      const updatedEvents = events.map((event, index) => index === selectedEventIndex ?  updateEvent : event);
      setEvents(updateEvents);
      setSelectedEventIndex(null)
    }

    const deleteEvent = (index) => {
     setEvents(events.filter((_, i)=> i !== index));

    }

    const selectEvent = (index) => {
      setSelectedEventIndex(index);
    }


    const checkConflict = (newEvent) => {
      return events.some(event => {
         
        event.participants.some(participant => newEvent.participants.includes(participant)) &&
        ((newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) || 
        (newEvent.endTime > event.startTime && newEvent.endTime < event.endTime)  ||
        (newEvent.startTime <= event.startTime && newEvent.startTime >= event.endTime)
        )
      })
    }


  


  return (
    <div>
    <h1>Calender</h1>
    <Calender events={events} deleteEvent={deleteEvent} ></Calender>
   
    <EventList events={events} selectedEvent={selectedEvent}></EventList>
    <EventForm 
     addEvent={addEvent}
     selectedEvent={selectedEventIndex !== null ? events[selectedEventIndex] : null}
     updateEvent = {updateEvent}
    ></EventForm>

   </div>
  );
}
