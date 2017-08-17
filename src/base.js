import 'babel-polyfill';
// import ixhr from './blocks/XHR/ixhr.js';
// import PromiseXHR from './blocks/XHR/PromiseXHR.js';
// import iFetch from './blocks/XHR/iFetch.js';

// const params = {
//         method: 'GET',
//         url: '/api/posts'
//     };

// const params = {
//         method: 'PUT',
//         url: '/api/profile',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: {
//             fn: 'Boris Cherepakha 5',
//             email: 'boris@cherepaha.pp.ua'
//         }
//     };

/** В старом стиле */
// ixhr(params, successHandler, errorHandler);

/** В новом стиле */
// PromiseXHR(params)
//     .then(successHandler)
//     .catch(errorHandler)

/** Грядущее нам готовит */
// params.body = JSON.stringify(params.body);
// iFetch(params)
//     .then(successHandler)
//     .catch(errorHandler)

/** Обработчики запроса */
// function successHandler(response) {
//     console.log('onSuccess', response);
// }
//
// function errorHandler(response) {
//     console.log('onError', response);
// }


// Practice

import {getPosts, getPost, getComments, sendComment} from './blocks/DB/DB.js';
import {getQueryParam} from './blocks/i/iEssential.js';
import Article from './blocks/Article/Article.js';
import Comments from './blocks/Comments/Comments.js';
import Watch from './blocks/Watch/Watch.js';
import {closePopup} from './blocks/Popup/Popup.js';

const Store = {},
    pageTitle = document.getElementById('page-title'),
    content = document.getElementById('content'),
    {pathname} = window.location,
    pageParams = getQueryParam(window.location);

console.log('location', getQueryParam(window.location));
console.log({pathname});

document.body.appendChild(Watch());

// submitHandler = _id => newComment => {
//
// }

function submitHandler(_id) {
    return function(newComment) {
        newComment.post_id = _id;

        return sendComment(newComment)
            .then(({responseData}) => {
                closePopup();
                const event = new Event('addComment');
                event.details = responseData;

                document.dispatchEvent(event);
            })
            .catch((...arg) => console.error(arg));
    }
}


// function submitHandler(_id, newComment) {
//
// }

switch (pathname) {
    case '/article.html':
        getPost(pageParams.id)
            .then(({responseData}) => {
                Store.article = responseData[0];

                return getComments(Store.article._id)
            })
            .then(({responseData}) => {
                content.innerHTML = '';
                pageTitle.innerText = `Article ${Store.article.guid}`;
                content.appendChild(Article(Store.article, false));
                content.appendChild(Comments(Store.article._id, responseData, submitHandler(Store.article._id)));
                // content.appendChild(Comments(responseData, submitHandler.bind(this, Store.article._id)));
            });
        break;
    default:
        getPosts()
            .then(({responseData}) => {
                content.innerHTML = '';
                pageTitle.innerText = 'Articles';

                responseData.forEach(articleData => {
                    content.appendChild(Article(articleData));
                });
            });
}
