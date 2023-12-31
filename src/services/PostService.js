import createHttp from "./BaseService";

const http = createHttp(true);

export const createPost = (body) => http.post('/post/create', body);

export const deletePost = (postId) => http.delete(`/post/delete/${postId}`);

export const getCurrentUserPosts = () => http.get('/post/list');

export const editPost = (postId, body) => http.patch(`/post/edit/${postId}`);

export const getPostsForYou = () => http.get('/post/timeline/foryou');

export const getPostsFriends = () => http.get('/post/timeline/friends');

export const getAllPosts = () => http.get('/posts');

export const getUserPosts = (id) => http.get(`/posts/${id}`);