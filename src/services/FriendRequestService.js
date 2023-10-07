import createHttp from "./BaseService";

const http = createHttp(true);

export const sendFriendRequest = (id, body) => http.post(`/friend-request/${id}`, body);

export const getFriendRequests = () => http.get('/friend-requests');