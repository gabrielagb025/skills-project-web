import createHttp from "./BaseService";

const http = createHttp(true);

export const createRating = (id, body) => http.post(`/rating/create/${id}`, body);

export const getRatings = (id) => http.get(`/rating/list/${id}`);

export const deleteRating = (ratingId) => {
    return http.delete(`/rating/delete/${ratingId}`)
      .then(response => response.data) // Asegúrate de que estás devolviendo la respuesta del servidor correctamente
      .catch(error => {
        throw error;
      });
  };
  