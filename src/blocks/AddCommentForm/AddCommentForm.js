const formTemplate = `
    <textarea required name="comment" class="add-comment__text"></textarea>
    <label class="add-comment__row">
        <span class="add-comment__row-name">Author</span>
        <input type="text" name="author" class="add-comment__row-input" required>
    </label>
    <label class="add-comment__row">
        <span class="add-comment__row-name">Email</span>
        <input type="email" name="mail" class="add-comment__row-input" required>
    </label>
    <div class="add-comment__controls">
        <input type="submit" value="Send comment">
    </div>
`;

export default function AddCommentForm(submitHandler) {
    const formElem = document.createElement('form');

    formElem.innerHTML = formTemplate;
    formElem.classList.add('add-comment');
    formElem.setAttribute('novalidate', true);

    const textElem = formElem.querySelector('.add-comment__text'),
        authorElem = formElem.querySelector('[name=author]'),
        mailElem = formElem.querySelector('[name=mail]');

    textElem.addEventListener('keypress', () => validate());
    authorElem.addEventListener('keypress', () => validate());
    mailElem.addEventListener('keypress', () => validate());

    formElem.addEventListener('submit', e => {
        e.preventDefault();

        if (validate()) {
            if (submitHandler) {
                const [first, ...last] = authorElem.value.split(' ');

                submitHandler({
                    text: textElem.value,
                    author: {
                        first,
                        last: last.join(' '),
                        email: mailElem.value
                    }
                });
            }
        }
    });

    function validate() {
        let valid = true;

        if (!textElem.value) {
            valid = false;
            textElem.classList.add('add-comment__error');
        } else {
            textElem.classList.remove('add-comment__error');
        }

        if (!authorElem.value) {
            valid = false;
            authorElem.classList.add('add-comment__error');
        } else {
            authorElem.classList.remove('add-comment__error');
        }

        if (!mailElem.value || !/\S+@\S+\.\S+/i.test(mailElem.value)) {
            valid = false;
            mailElem.classList.add('add-comment__error');
        } else {
            mailElem.classList.remove('add-comment__error');
        }

        return valid;
    }

    return formElem;
}
