import createHttp from "./BaseService";

const http = createHttp(true);

export const createPost = (body) => http.post('/post/create', body)