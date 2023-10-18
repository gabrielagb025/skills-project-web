import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { getCurrentUserEvents, deleteEvent } from "../../../services/EventService";
import Modal from 'react-modal';
import { useAuthContext } from "../../../contexts/AuthContext";
import { format } from "date-fns";
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
                closeModal();
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const modalStyles = {
        content: {
            width: "450px",  // Ancho del modal
            height: "300px",  // Altura automática
            margin: "auto",  // Centra el modal horizontalmente
            borderRadius: "25px",  // Bordes redondeados
            border: "2px solid #5e8039",
            padding: "20px",
            backgroundColor: "#ffffff",
        }
    };

    return (
        <div className="calendar-margin">
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
                        eventColor="#EA9F92"
                        eventBackgroundColor="#EA9F92"
                        eventDisplay='block'
                        eventClick={handleEventClick}
                        locales={[esLocale]}
                        locale='es'
                        themeSystem='standard'
                    />
                </div>
                <div className="calendar-event-modal">
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Información del Evento"
                        style={modalStyles}
                    >
                        <div className="event-info-modal mt-4">
                            <div className="modal-close-icon mb-4" onClick={closeModal}>
                                <i className="bi bi-x-circle fs-5"></i>
                            </div>
                            <div className="event-title d-flex align-items-center mt-2">
                                <h5 className="me-2 mb-0">Nombre del evento:</h5>
                                <h5 className="mb-0">{selectedEvent && selectedEvent.title}</h5>
                            </div>

                            <div className="event-user d-flex align-items-center mt-2">
                                <h5 className="me-2 mb-0">Usuario:</h5>
                                <h5 className="mb-0">
                                    {selectedEvent &&
                                        selectedEvent._def.extendedProps.users
                                            .filter((user) => user.id !== currentUser.id) // Filtrar el usuario en sesión
                                            .map((user) => user.name)
                                            .join(", ")}
                                </h5>
                            </div>

                            <div className="event-start d-flex align-items-center mt-2">
                                <h5 className="me-2 mb-0">Hora de inicio:</h5>
                                <h5 className="mb-0">
                                    {selectedEvent &&
                                        format(new Date(selectedEvent.start), "HH:mm")} hrs
                                </h5>
                            </div>

                            <div className="event-end d-flex align-items-center mt-2">
                                <h5 className="me-2 mb-0">Hora de finalización:</h5>
                                <h5 className="mb-0">
                                    {selectedEvent &&
                                        format(new Date(selectedEvent.end), "HH:mm")} hrs
                                </h5>
                            </div>
                            <button className="btn delete-event mt-4" onClick={() => handleDeleteEvent(selectedEvent.id)}><i className="bi bi-trash fs-5 me-2"></i>Eliminar evento</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Calendar;