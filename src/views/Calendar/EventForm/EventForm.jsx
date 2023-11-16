import { useParams, useNavigate } from "react-router-dom";
import { createEvent } from "../../../services/EventService";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import './EventForm.css';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import es from 'date-fns/locale/es';


const EventForm = () => {

    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const navigate = useNavigate();

    const { id } = useParams();

    const handleSubmitEvent = (e) => {
        e.preventDefault();

        const startUtc = start.toISOString();
        const endUtc = end.toISOString();

        const eventData = {
            title: title,
            start: startUtc,
            end: endUtc,
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
                        <label htmlFor="title" className="form-label"><h5 className="text-center">Título del evento:</h5></label>
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
                        <label className="form-label"><h5>Inicio:</h5></label>
                        <DatePicker
                            className="form-control"
                            selected={start}
                            onChange={date => setStart(date)}
                            dateFormat="yyyy-MM-dd"
                            locale={es}
                        />
                        <input
                            className="form-control mt-2"
                            type="time"
                            value={moment(start).format("HH:mm")}
                            onChange={e => setStart(moment(`${moment(start).format("YYYY-MM-DD")} ${e.target.value}`).toDate())}
                        />
                    </div>
                    <div className="input-form-event mt-3">
                        <label className="form-label"><h5>Finalización:</h5></label>
                        <DatePicker
                            className="form-control"
                            selected={end}
                            onChange={date => setEnd(date)}
                            dateFormat="yyyy-MM-dd"
                            locale={es}
                        />
                        <input
                            className="form-control mt-2"
                            type="time"
                            value={moment(end).format("HH:mm")}
                            onChange={e => setEnd(moment(`${moment(end).format("YYYY-MM-DD")} ${e.target.value}`).toDate())}
                        />
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