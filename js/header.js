const header = () => {
  let modal = document.querySelector('.modal');
  let header_location = document.querySelector('.header__location');
  let modal_body = document.querySelector('.modal__body');
  let body = document.querySelector('body');
  let my_place_li = document.querySelectorAll('.my__place__ul li');
  
  const modalHandler = () => {
    modal.style.display = 'block';
    modal_body.classList.add('on');
    body.style.overflow = 'hidden';
    my_place_li[0].focus();
  };
  
  const modalOff = (e) => {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
    e.target.tagName === 'LI' && e.target.textContent !== '주소 추가' ? header_location.textContent = e.target.textContent : null;
  };

  const a11yModalHandler = (e) => {
    e.keyCode === 13 && modalHandler();
  }

  const a11yListHandler = (e) => {
    e.keyCode === 13 && modalOff(e);
  }
  
  header_location.addEventListener('click', modalHandler);
  modal.addEventListener('click', (e) => modalOff(e));
  header_location.addEventListener('keyup', (e) => a11yModalHandler(e))
  my_place_li.forEach(x => x.addEventListener('keyup', (e) => a11yListHandler(e)));
};

export default header;