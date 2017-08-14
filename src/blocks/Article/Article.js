import {getTemplate} from '../i/iEssential.js';

const articleTemplate = `
    <h2 class="article__title">
        <a href="/article.html?id={_id}">{title}</a>
    </h2>
    <div class="article__description">
        {about}
    </div>
    <div class="article__author">
        {authorName} <a href="mailto:{authorEmail}">{authorEmail}</a>
    </div>
    <div class="article__footer">
        {created}
    </div>
`, fullArticle = `
    <div class="article__author">
        {authorName} <a href="mailto:{authorEmail}">{authorEmail}</a>
    </div>
    <div class="article__footer">
        {created}
    </div>
    <div class="article__description">
        {text}
    </div>
    <div class="article__tags">
        {tags}
    </div>
`;

export default function createArticle(articleData, desc = true) {
    const article = document.createElement('article'),
        {
            author,
            about,
            _id,
            guid,
            created,
            text,
            tags
        } = articleData,
        title = `Article ${guid}`;

    if (desc) {
        article.innerHTML = getTemplate(articleTemplate, {
            about,
            authorName: `${author.first} ${author.last}`,
            authorEmail: author.email,
            created,
            title,
            _id
        });
    } else {
        article.innerHTML = getTemplate(fullArticle, {
            authorName: `${author.first} ${author.last}`,
            authorEmail: author.email,
            created,
            _id,
            text: text.split('\n\n')
                .map(t => `<p>${t}</p>`)
                .join(''),
            tags: tags.join(', ')
        });
    }

    article.classList.add('article');

    return article;
}
