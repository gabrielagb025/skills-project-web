import createHttp from "./BaseService";

const http = createHttp(true);

export const createRating = (id, body) => http.post(`/rating/create/${id}`, body);

export const getRatings = (id) => http.get(`/rating/list/${id}`);

export const deleteRating = (ratingId) => http.delete(`/rating/delete/${ratingId}`)
  