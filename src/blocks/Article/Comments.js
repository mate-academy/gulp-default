import {getTemplate} from '../i/iEssential.js';

const commentsTemplate = `
    <h3 class="comments__title">Comments</h3>
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

export default function createComments(comments) {
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

    return commentsItem;
}
