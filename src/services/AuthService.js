import createHttp from './BaseService';

const http = createHttp()

export const register = (user) => http.post('/register', user)