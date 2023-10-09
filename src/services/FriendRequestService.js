import createHttp from "./BaseService";

const http = createHttp(true);

export const sendFriendRequest = (id, body) => http.post(`/friend-request/${id}`, body);

export const getFriendRequests = () => http.get('/friend-requests');

export const respondToFriendRequest = (id, status) => http.patch(`/friend-request/edit/${id}`, { status });

export const getFriends = () => http.get('/friends');

export const getPendingFriendRequests = () => http.get('/friend-requests/pending');

export const cancelFriendRequest = (id) => http.delete(`/friend-request/delete/${id}`);

export const getAcceptedFriendRequest = (id) => http.get(`/friend-request/accepted/${id}`);