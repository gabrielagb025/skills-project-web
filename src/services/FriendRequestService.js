import createHttp from "./BaseService";

const http = createHttp(true);

export const sendFriendRequest = (id, body) => http.post(`/friend-request/${id}`, body)