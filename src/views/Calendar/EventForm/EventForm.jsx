import { useParams, useNavigate } from "react-router-dom";
import { createEvent } from "../../../services/EventService";
import { useState } from "react";

const EventForm = () => {
    const initialValues = {
        title: "",
        date: "",
        startTime: "",
        endTime: "",
    }

    const navigate = useNavigate();

    const { id } = useParams();
    const [newEvent, setNewEvent] = useState(initialValues);

    const handleChangeEvent = (ev) => {
        const key = ev.target.name;
        const value = ev.target.value;

        setNewEvent(prevEvent => ({
            ...prevEvent,
            [key]: value
        }))
    }

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        const startDateTime = new Date(`${newEvent.date}T${newEvent.startTime}`);
        const endDateTime = new Date(`${newEvent.date}T${newEvent.endTime}`);

        const eventData = {
            title: newEvent.title,
            date: startDateTime, // Incluir la propiedad date con el objeto Date de inicio
            startTime: startDateTime,
            endTime: endDateTime
        };
        createEvent(id, eventData)
            .then((res) => {
                console.log('evento creado');
                navigate('/user/calendar')
            })
            .catch((err) => {
                console.error(err);
            })
    }


    return (
        <div className="event-form container">
            <h1>Crea el evento de estudio</h1>
            <form onSubmit={handleSubmitEvent}>
                <div>
                    <label htmlFor="title" className="form-label">Título del evento:</label>
                    <input
                        onChange={handleChangeEvent}
                        className="form-control"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Escribe el título del evento"
                        value={newEvent.title}
                    />
                </div>
                <div>
                    <label htmlFor="date" className="form-label">
                        Fecha:
                    </label>
                    <input
                        onChange={handleChangeEvent}
                        className="form-control"
                        type="date"
                        id="date"
                        name="date"
                        value={newEvent.date}
                    />
                </div>
                <div>
                    <label htmlFor="startTime" className="form-label">
                        Hora de inicio:
                    </label>
                    <input
                        onChange={handleChangeEvent}
                        className="form-control"
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={newEvent.startTime}
                    />
                </div>
                <div>
                    <label htmlFor="endTime" className="form-label">
                        Hora de finalización:
                    </label>
                    <input
                        onChange={handleChangeEvent}
                        className="form-control"
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={newEvent.endTime}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Guardar evento</button>
            </form>
        </div>
    )
}

export default EventForm;