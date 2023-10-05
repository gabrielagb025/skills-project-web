import createHttp from "./BaseService";

const http = createHttp(true);

export const createPost = (body) => http.post('/post/create', body);

export const deletePost = (postId) => http.delete(`/post/delete/${postId}`);

export const getCurrentUserPosts = () => http.get('/post/list')