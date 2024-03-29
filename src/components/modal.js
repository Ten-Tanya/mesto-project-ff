
export function openPopup(popUpElement){
    popUpElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', escapeHandler);
}

export function closePopup(popUpElement){
    popUpElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeHandler)
}

export function escapeHandler(evt) {     
   if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup)
   }
};

export function overlayClosePopup(evt) {
    const openedModal = evt.target.closest('.popup_is-opened')
    if (evt.target === openedModal){
        closePopup(openedModal)
    }
}






