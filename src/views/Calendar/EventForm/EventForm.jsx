import { useParams, useNavigate } from "react-router-dom";
import { createEvent } from "../../../services/EventService";
import { useState } from "react";
import moment from "moment";
import "moment/locale/es"; 
import './EventForm.css';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

moment.locale("es");

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
        <div className="event-form-margin">
            <div className="top-div-header"></div>
            <div className="event-form d-flex align-items-center flex-column container mt-4">
                <div>
                    <h1>Crea el evento de estudio</h1>
                    <hr />
                </div>
                <form onSubmit={handleSubmitEvent}>
                    <div className="input-form-event mt-3">
                        <label htmlFor="title" className="form-label"><h5>Título del evento:</h5></label>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            className="form-control"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Fotografía nocturna"
                            value={title}
                        />
                    </div>
                    <div className="input-form-event mt-3">
                        <label><h5>Inicio:</h5></label>
                        <Datetime 
                        value={start} 
                        open={false}
                        onChange={date => setStart(date)}/>
                    </div>
                    <div className="input-form-event mt-3">
                        <label><h5>Finalización:</h5></label>
                        <Datetime 
                        value={end} 
                        open={false}
                        onChange={date => setEnd(date)} />
                    </div>
                    <div className="button-form-event mt-3">
                        <button type="submit" className="btn mt-3">Guardar evento</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventForm;