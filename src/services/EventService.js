import createHttp from "./BaseService";

const http = createHttp(true);

export const createEvent = (id, body) => http.post(`/event/create/${id}`, body);

export const getCurrentUserEvents = () => http.get(`/event/list`);

export const deleteEvent = (id) => http.delete(`/event/delete/${id}`);