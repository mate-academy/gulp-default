import {getTemplate} from '../i/iEssential.js';
import * as Popup from '../Popup/Popup.js';
import AddCommentForm from '../AddCommentForm/AddCommentForm.js';

const commentsTemplate = `
    <h3 class="comments__title">Comments</h3>
    <div class="comments__controls">
        <button class="comments__add-btn">Add comment</button>
    </div>
    <div class="comments__list">
        {comments}
    </div>`,
    commentTemplate = `
    <div class="comment">
        <div class="comment__author">
            {authorName} <a href="mailto:{authorEmail}">{authorEmail}</a>
        </div>
        <div class="comment__date">
            {created}
        </div>
        <div class="comment__text">
            {text}
        </div>
    </div>`;

export default function createComments(_id, comments, submitHandler) {
    const commentsItem = document.createElement('div'),
        res = [];

    commentsItem.classList.add('comments');
    comments.forEach(comment => {
        const {author, created, text} = comment;

        res.push(
            getTemplate(commentTemplate, {
                authorName: `${author.first} ${author.last}`,
                authorEmail: author.email,
                created,
                text: text.split('\n\n')
                    .map(t => `<p>${t}</p>`)
                    .join('')
            })
        );
    })

    commentsItem.innerHTML = getTemplate(
        commentsTemplate,
        {
            comments: res.join('')
        });

    // add event listener
    const commentsList = commentsItem.querySelector('.comments__list'),
        btn = commentsItem.querySelector('.comments__add-btn');

    if (btn) {
        btn.addEventListener('click', () => {
            Popup.showPopup(AddCommentForm(submitHandler));
        })
    } else {
        console.error('Cann\'t find element .comments__add-btn', commentsItem);
    }

    document.addEventListener('addComment', e => {
        const {details} = e,
            commentHTML = getTemplate(commentTemplate, {
                authorName: `${details.author.first} ${details.author.last}`,
                authorEmail: details.author.email,
                created: details.created,
                text: details.text.split('\n\n')
                    .map(t => `<p>${t}</p>`)
                    .join('')
            }),
            commentWrapper = document.createElement('div');

        commentWrapper.innerHTML = commentHTML;
        comments.push(details);
        res.push(commentHTML);

        commentsList.appendChild(commentWrapper.querySelector('.comment'));
    });

    return commentsItem;
}
