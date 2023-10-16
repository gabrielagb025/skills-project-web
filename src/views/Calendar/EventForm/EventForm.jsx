import { useParams, useNavigate } from "react-router-dom";
import { createEvent } from "../../../services/EventService";
import { useState } from "react";
import Datetime from "react-datetime";

const EventForm = () => {

    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const navigate = useNavigate();

    const { id } = useParams();
    // const [newEvent, setNewEvent] = useState(initialValues);

   /* const handleChangeEvent = (ev) => {
        const key = ev.target.name;
        const value = ev.target.value;

        setNewEvent(prevEvent => ({
            ...prevEvent,
            [key]: value
        }))
    }*/

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        const eventData = {
            title: title,
            start: start,
            end: end,
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
                        onChange={e => setTitle(e.target.value)}
                        className="form-control"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Escribe el título del evento"
                        value={title}
                    />
                </div>
                <div>
                    <label>Inicio:</label>
                    <Datetime value={start} onChange={date => setStart(date)}/>
                </div>
                <div>
                    <label>Finalización:</label>
                    <Datetime value={end} onChange={date => setEnd(date)}/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Guardar evento</button>
            </form>
        </div>
    )
}

export default EventForm;