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

export const sendComment = function(comment) {
    const d = new Date();

    comment.id = d.getTime();
    comment._id = d.getTime();
    comment.guid = d.getTime();
    comment.created = d.toUTCString();

    return PromiseXHR({
            method: 'POST',
            url: `/api/comments`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: comment
        })
}
