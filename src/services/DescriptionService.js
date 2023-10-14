import createHttp from "./BaseService";

const http = createHttp(true);

export const createDescription = (body) => http.post('/description/create', body);

export const currentUserDescription = () => http.get('/description/me');

export const getUserDescription = (id) => http.get(`/description/${id}`);

export const editDescription = (id, body) => http.patch(`/description/edit/${id}`, body);