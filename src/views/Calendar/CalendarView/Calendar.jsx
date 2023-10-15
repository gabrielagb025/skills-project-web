import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getCurrentUserEvents } from "../../../services/EventService";
import Modal from 'react-modal';
import './CalendarView.css';

Modal.setAppElement("#root");

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        setSelectedEvent(eventInfo.event);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <>
            <h1>Calendario</h1>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventColor="#166339"
                eventBackgroundColor="#166339"
                eventClick={handleEventClick}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Información del Evento"
            >
                {console.log(selectedEvent)}
                <h2>{selectedEvent && selectedEvent.title}</h2>
                <h2>{selectedEvent && selectedEvent._def.extendedProps.users.forEach((user) => (user.name))}</h2>
                <p>
                    {selectedEvent && selectedEvent.startTime && selectedEvent.endTime &&
                        `Hora de inicio: ${new Date(selectedEvent.startTime).getHours()}:${new Date(selectedEvent.startTime).getMinutes()}`
                    }
                </p>
                <p>
                    {selectedEvent && selectedEvent.startTime && selectedEvent.endTime &&
                        `Hora de fin: ${new Date(selectedEvent.endTime).getHours()}:${new Date(selectedEvent.endTime).getMinutes()}`
                    }
                </p>
                <button className="btn btn-primary" onClick={closeModal}>Cerrar</button>
            </Modal>
        </>
    )
}

export default Calendar;