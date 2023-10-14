import createHttp from "./BaseService";

const http = createHttp(true);

export const createEvent = (id, body) => http.post(`/event/create/${id}`, body);