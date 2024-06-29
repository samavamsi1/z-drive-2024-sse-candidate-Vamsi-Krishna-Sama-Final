
import React, { useEffect, useState } from 'react'


export default function EventForm({addEvent, selectedEvent ,  updateEvent}){

    const [eventName,  setEventName] = useState('');
    const [startTime , setStartTime] = useState('');
    const [endTime , setEndTime] = useState('');
    const [participants,  selectedParticipants] = useState([]);



    const  participantsOptions = [
        {value : 'person1' ,  label : 'Person 1'},
        {value : 'person2' ,  label : 'Person 2'},
        {value : 'person3' ,  label : 'Person 3'},
        {value : 'person4' ,  label : 'Person 4'},
        {value : 'person5' ,  label : 'Person 5'},

    ]


    useEffect(()=> {
        if(selectedEvent){
            setEventName(selectedEvent.eventName);
            setStartTime( new Date(selectedEvent.startTime).toISOString().slice(0,16))
            setEndTime( new Date(selectedEvent.endTime).toISOString().slice(0,16))
            setParticipants(selectedEvent.participants.map(p => p.participantsOptions.find(opt => opt.value === p)))
        }
    }, [selectedEvent])

    const handleSubmit = (event) => {
        event.preventDefault();

        const newEvent = {
            eventName ,
            startTime : new Date(startTime).toISOString(),
            endTime : new Date(endTime).toISOString(),
            participants : participants.map((p => p.value))
        }

        console.log(newEvent);

        if(selectedEvent){
            updateEvent(newEvent);
        }else{
            addEvent(newEvent);
        }
    }

    const restForm = () => {
        setEventName('');
        setEndTime('');
        setStartTime('');
        setParticipants([]);
    }

    const handleParticipantChange = (e) => {
        let data = Array.from(e.target.options).filter(option => option.selected)
        .map(option => option.value);

        console.log(data);

      selectedParticipants(data)

    }

    return (

    <div>
        <div> 
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>
                <label>Event Name</label>
                <input type="text" id="event-name" value={eventName} onChange={(e)=> setEventName(e.target.value)} required ></input>



                <label> Start Time</label>
                <input type="datetime-local" value={startTime} onChange={(e)=> setStartTime(e.target.value)} required></input>

                <label> End Time</label>
                <input type="datetime-local" value={endTime} onChange={(e)=> setEndTime(e.target.value)} required></input>

                <label>Select participants</label>
                <select multiple 
                    value={participants.map(p=> p.value)}
                    onChange={handleParticipantChange}
                    required
                    >
                    {participantsOptions.map((option, index)=> (
                        <option key={index} value={option.value} >{option.label}</option>
                    ))}
                </select>

                <button type="submit">{selectedEvent  ? 'Update Event' : 'Create Event'}</button>


            </form>

        </div>
    </div>

    )
}