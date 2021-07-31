const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];





// 1. Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

// вариант 1
// const galleryRef = document.querySelector('.js-gallery');

// const createEl = (acc, {preview, original, description}) => acc + 
// `<li class='gallery__item'>
// <a class='gallery__link' href="${original}">
// <img class='gallery__image' 
// src="${preview}" 
// alt="${description}">
// </a>
// </li>`;


// const markUp = galleryItems.reduce(createEl, '');

// galleryRef.insertAdjacentHTML('beforeend', markUp);

// вариант 2

const galleryRef = document.querySelector('.js-gallery');
const galleryMarkup = createGallery(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery(images) {
  return images
    .map(({ original, preview, description }) => {
      return `<li class='gallery__item'>
      <a class='gallery__link' href="">
      <img class='gallery__image'
      srcset='${original}' 
      src="${preview}" 
      alt="${description}">
      </a>
      </li>`;
    }).join('');

};



// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

// вариант 1
// const galleryClick = galleryRef.addEventListener('click', onClick);
// function onClick(event) {
//   if(event.target.nodeName !== 'IMG') {
//     return;
//   }
// };

// вариант 2

const galleryClick = galleryRef.addEventListener('click', onClick);

const openModalClick = document.querySelector('.lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const modalImg = document.querySelector('.lightbox__image');

closeModalBtn.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onClickOverlay);



function onClick(e) {
  const isImage = e.target.classList.contains('gallery__image');
  if(!isImage) {
    return;
  }

  const bigImgSrc = e.target.getAttribute('srcset');
  const bigImgAlt = e.target.getAttribute('alt');
  
// 3. Открытие модального окна по клику на элементе галереи.

  e.preventDefault();
  openModalClick.classList.add('is-open');
  window.addEventListener('keydown', onCloseEsc);
  
// 4. Подмена значения атрибута src элемента img.lightbox__image.

modalImg.src = bigImgSrc;
modalImg.alt = bigImgAlt;


};

// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

function onCloseModal() {
  window.removeEventListener('keydown', onCloseEsc);
  openModalClick.classList.remove('is-open');


  // 6. Очистка значения атрибута src элемента img.lightbox__image. 
  modalImg.src = "";
  modalImg.alt = "";

};


// 7. Закрытие модального окна по клику на div.lightbox__overlay.

function onClickOverlay(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  };

};


// 8. Закрытие модального окна по нажатию клавиши ESC.

function onCloseEsc(e) {
  if(e.code === 'Escape') {
    onCloseModal();
  }

};
 


// 9. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".