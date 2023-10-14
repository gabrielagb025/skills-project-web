import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getCurrentUserEvents } from "../../../services/EventService";

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getCurrentUserEvents()
            .then((evList) => {
                setEvents(evList);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    const handleEventClick = (eventInfo) => {
        // `eventInfo` contiene información sobre el evento clicado
        // Puedes acceder a las propiedades del evento como eventInfo.event.title, eventInfo.event.start, etc.
        // Aquí puedes mostrar un modal o una ventana emergente con la información del evento
        alert(`Evento: ${eventInfo.event.title}\nFecha de inicio: ${eventInfo.event.start}`);
    };

    return (
        <>
            <h1>Calendario</h1>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
            />
        </>
    )
}

export default Calendar;