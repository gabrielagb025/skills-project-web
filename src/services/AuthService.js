import createHttp from './BaseService';
const http = createHttp()

export const register = (user) => http.post('/register', user);

export const login = (user) => http.post('/login', user);

export const activateUser = (id) => http.get(`/activate/${id}`);