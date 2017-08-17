const Popup = document.createElement('div'),
    PopupBody = document.createElement('div');

Popup.classList.add('popup__wrapper');
PopupBody.classList.add('popup');
Popup.appendChild(PopupBody);

function addContent(content) {
    PopupBody.innerHTML = '';
    PopupBody.appendChild(content);
}

function showPopup(content) {
    document.body.appendChild(Popup);
    Popup.classList.add('popup__wrapper--visible');

    if (content) {
        addContent(content);
    }
}

function closePopup() {
    Popup.classList.remove('popup__wrapper--visible');
    PopupBody.innerHTML = '';
}

Popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup__wrapper')) {
        closePopup();
    }
})

export {addContent, showPopup, closePopup};
