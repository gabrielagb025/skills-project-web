import createHttp from './BaseService';
const http = createHttp()

export const getSkills = () => http.get('/skills');