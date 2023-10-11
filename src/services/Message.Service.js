import createHttp from "./BaseService";

const http = createHttp(true);

export const createMessage = (id, body) => http.post(`/message/create/${id}`, body);