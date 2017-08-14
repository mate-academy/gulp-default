import 'babel-polyfill';
import ixhr from './blocks/XHR/ixhr.js';
import PromiseXHR from './blocks/XHR/PromiseXHR.js';
import iFetch from './blocks/XHR/iFetch.js';

const params = {
        method: 'GET',
        url: '/api/profile'
    };

// const params = {
//         method: 'PUT',
//         url: '/api/profile',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: {
//             fn: 'Boris Cherepakha',
//             email: 'boris@cherepaha.pp.ua'
//         }
//     };

/** В старом стиле */
ixhr(params, successHandler, errorHandler);

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
function successHandler(response) {
    console.log('onSuccess', response);
}

function errorHandler(response) {
    console.log('onError', response);
}
