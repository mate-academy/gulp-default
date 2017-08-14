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

import {getPosts, getPost, getComments} from './blocks/DB/DB.js';
import {getQueryParam} from './blocks/i/iEssential.js';
import Article from './blocks/Article/Article.js';
import Comments from './blocks/Article/Comments.js';

const Store = {},
    pageTitle = document.getElementById('page-title'),
    content = document.getElementById('content'),
    {pathname} = window.location,
    pageParams = getQueryParam(window.location);

console.log('location', getQueryParam(window.location));
console.log({pathname});

switch (pathname) {
    case '/article.html':
        getPost(pageParams.id)
            .then(({responseData}) => {
                Store.article = responseData[0];

                return getComments(Store.article._id)
            })
            .then(({responseData}) => {
                console.log(responseData);

                content.innerHTML = '';
                pageTitle.innerText = `Article ${Store.article.guid}`;
                content.appendChild(Article(Store.article, false));
                content.appendChild(Comments(responseData));
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
