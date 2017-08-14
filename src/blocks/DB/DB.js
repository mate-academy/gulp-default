import PromiseXHR from '../XHR/PromiseXHR.js';

export const getPosts = function() {
    return PromiseXHR({
        method: 'GET',
        url: '/api/posts'
    });
}

export const getPost = function(id) {
    return PromiseXHR({
        method: 'GET',
        url: `/api/posts?_id=${id}`
    });
}

export const getComments = function(id) {
    return PromiseXHR({
        method: 'GET',
        url: `/api/comments?post_id=${id}`
    });
}
