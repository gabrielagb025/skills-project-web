import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { getCurrentUserEvents, deleteEvent } from "../../../services/EventService";
import Modal from 'react-modal';
import { useAuthContext } from "../../../contexts/AuthContext";
import './CalendarView.css';

Modal.setAppElement("#root");

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { user: currentUser } = useAuthContext();

    useEffect(() => {
        getCurrentUserEvents()
            .then((evList) => {
                setEvents(evList);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    // console.log('eventos:', events)

    const handleEventClick = (eventInfo) => {
        setSelectedEvent(eventInfo.event);
        console.log(eventInfo.event.start)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleDeleteEvent = (eventId) => {
        deleteEvent(eventId)
        .then(() => {
            const filteredEvents = events.filter((event) => event.id !== eventId);
            setEvents(filteredEvents);
        })
    }

    const calendarStyles = {
        ".fc-day-number": {
            color: "#ff0000", // Cambia el color de los números a tu preferencia
        },
        ".fc-day-header": {
            backgroundColor: "#ffcc00", // Cambia el color de fondo de los días de la semana a tu preferencia
            color: "#000", // Cambia el color del texto de los días de la semana a tu preferencia
        },
    };

    return (
        <div className="calendar-container mt-4 container">
            <div>
                <h1>Calendario</h1>
            </div>
            <hr />
            <div className="calendar"> 
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventColor="#5e8039"
                eventBackgroundColor="#5e8039"
                eventDisplay='block'
                eventClick={handleEventClick}
                locales={[esLocale]}
                locale='es'
                themeSystem='standard'
            />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Información del Evento"
            >
                <h2>{selectedEvent && selectedEvent.title}</h2>
                <h2>
                    {selectedEvent &&
                        selectedEvent._def.extendedProps.users
                            .filter((user) => user.id !== currentUser.id) // Filtrar el usuario en sesión
                            .map((user) => user.name)
                            .join(", ")}
                </h2>
                <h4>{selectedEvent && selectedEvent.start.toString()}</h4>
                <h4>{selectedEvent && selectedEvent.end.toString()}</h4>
                <button className="btn btn-danger" onClick={() => handleDeleteEvent(selectedEvent.id)}>Borrar</button>
                <div className="submit-button mt-3">
                <button className="btn" onClick={closeModal}>Cerrar</button>
                </div>
            </Modal>
        </div>
    )
}

export default Calendar;