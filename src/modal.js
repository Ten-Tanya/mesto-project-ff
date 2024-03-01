
export function openPopup(popUpElement){
    popUpElement.classList.add('popup_is-animated');
    setTimeout(() => {
        popUpElement.classList.add('popup_is-opened');
      }, 10);
    document.addEventListener('keydown', EscapeHandler);
}

export function closePopup(popUpElement){
    setTimeout(() => {
        popUpElement.classList.remove('opup_is-animated');
      }, 10);
      popUpElement.classList.remove('popup_is-opened');
}

export function EscapeHandler(evt) {     
    document.querySelectorAll('.popup').forEach((popup) => {
        if (popup.classList.contains('popup_is-opened') && evt.key === 'Escape')
        closePopup(popup)
        document.removeEventListener('keydown', EscapeHandler)})
};






