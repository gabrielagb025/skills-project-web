import createHttp from "./BaseService";

const http = createHttp(true);

export const getCurrentUser = () => http.get('/users/me');

export const getUsers = () => http.get('/users');

export const getFilteredUsers = () => http.get('/users/filtered');

export const getUser = (id) => http.get(`/user/detail/${id}`)
