//імпорт бібліотек НА ПОЧАТКУ!
//iziToast ДЛЯ виведення повідомлень сайт https://www.npmjs.com/package/izitoast https://marcelodolza.github.io/iziToast/
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//simplelightbox ДЛЯ відтворення великих картинок https://www.npmjs.com/package/simplelightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//імпорт з сусідніх файлів дж ес
import { gettingData } from './js/pixabay-api.js';
import { renderData } from './js/render-functions.js';
//ВСТАВКА ШЛЯХУ ДЛЯ ІЗІТОСТ ЩОБ РОБИЛА
import iconUrl from './img/octagon.svg';

// ключ що прриходить на https://pixabay.com

//1.створення форми для пошуку та результуючого ul картинок
const bodySelect = document.querySelector('body');
const firstHtml = `<div class="container">
    <form class="formFetchEl">
		<input type="text" class="search-input" name="search" />
		<button type="submit" class="btnEl">Search</button>
    </form>
    <span class="loader">Loading</span>
	  <ul class="galleryEl"></ul>
      <span class="loader-more">Loading</span>
      <button type="button" class="btnMorePostsEl">Load more</button>
</div>`;

bodySelect.insertAdjacentHTML('afterbegin', firstHtml);
//0 завантажувач кнопка
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');
const btnMorePosts = document.querySelector('.btnMorePostsEl');
const input = document.querySelector('.search-input');
//0 прибирання з виду завантажувача кнопки
loader.style.display = 'none';
btnMorePosts.style.display = 'none';
loaderMore.style.display = 'none';

// створення вигляду для бібліотеки що відкривань картинки
let gallery = new SimpleLightbox('.galleryEl a', {
  caption: true,
  captionDelay: 250,
  captionsData: 'alt',
});

// функія для отримання фото
const gettingUserForm = document.querySelector('form');
const userList = document.querySelector('.galleryEl');
let pageGrowthJs = 1;
let inputSearchListener;

async function addImage(InputSearch, pageGrowthJs, eventCome) {
  const comingsImg = await gettingData(InputSearch, pageGrowthJs);
  try {
    if (comingsImg.hits.length === 0) {
      btnMorePosts.style.display = 'none';
      //попередження .......IZITOST.......
      //alert("Sorry, there are no images matching your search query. Please try again!");
      iziToast.show({
        message:
          'Sorry, there are no images matching <br> your search query. Please try again!',
        messageColor: '#000',
        messageSize: '18px',
        messageLineHeight: '20px',
        backgroundColor: 'rgb(255,153,102)',
        position: 'topRight',
        iconUrl,
        imageWidth: 30,
      });
      // добавити скруглення для iziToast
      const iziToastElStyle = document.querySelector('.iziToast');
      iziToastElStyle.style.borderRadius = '10px';
      iziToastElStyle.style.overflow = 'hidden';
      //добавить стилі на іконку в ізітост
      const iziToastImgStyle = document.querySelector('.iziToast-cover');
      iziToastImgStyle.style.backgroundColor = 'transparent';
      iziToastImgStyle.style.left = '10px';
    } else {
      //очистка попереднього вмісту карток та створення нових ".galleryEl" для сабміту
      if (eventCome?.type === 'submit') {
        userList.innerHTML = '';
        //0 завантажувач видимий
        loader.style.display = 'block';
      } else {
        loaderMore.style.display = 'block';
      }

      renderData(comingsImg.hits, userList);
      //    console.log(comingsImg)
      //_______прибирання кнопки та повідомлення при кількості постів______
      const li = userList.querySelectorAll('li');
      if (comingsImg.totalHits <= li.length) {
        //попередження .......IZITOST.......
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#000',
          messageSize: '18px',
          messageLineHeight: '20px',
          backgroundColor: 'rgb(37, 150, 190)',
          position: 'topRight',
        });
        // добавити стилі для iziToast
        const iziToastElStyle = document.querySelector('.iziToast');
        iziToastElStyle.style.borderRadius = '10px';
        iziToastElStyle.style.overflow = 'hidden';
        const iziToastEl = document.querySelector('.iziToast-wrapper');
        iziToastEl.style.position = 'fixed';

        btnMorePosts.style.display = 'none';
        // Сховати індикатор завантаження після завантаження всіх картинок
        if (eventCome?.type === 'submit') {
          //0 завантажувач невидимий
          loader.style.display = 'none';
        } else {
          loaderMore.style.display = 'none';
        }
        return;
      }

      //метод для оновлення бібліотеки для асинхрону
      gallery.refresh();

      //0 Перевірте завантаження всіх зображень
      const images = userList.querySelectorAll('img');
      let loadedImagesCount = 0;

      images.forEach(img => {
        if (img.complete) {
          //
          // console.log(img.complete)
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            // Сховати індикатор завантаження після завантаження всіх картинок
            if (eventCome?.type === 'submit') {
              //0 завантажувач невидимий
              loader.style.display = 'none';
            } else {
              loaderMore.style.display = 'none';
            }
          }
        } else {
          img.addEventListener('load', () => {
            loadedImagesCount++;
            if (loadedImagesCount === images.length) {
              // Сховати індикатор завантаження після завантаження всіх картинок
              if (eventCome?.type === 'submit') {
                loader.style.display = 'none';
              } else {
                loaderMore.style.display = 'none';
              }
            }
          });
        }
      });
    }
  } catch (error) {
    //попередження .......IZITOST.......
    //alert(`Sorry, ${error}. Please try again!`);
    iziToast.show({
      message: `Sorry, ${error}. Please try again!`,
      messageColor: '#000',
      messageSize: '18px',
      messageLineHeight: '20px',
      backgroundColor: 'rgb(255,153,102)',
      position: 'topRight',
    });
    // добавити скруглення для iziToast
    const iziToastElStyle = document.querySelector('.iziToast');
    iziToastElStyle.style.borderRadius = '10px';
    const iziToastEl = document.querySelector('.iziToast-wrapper');
    iziToastEl.style.position = 'fixed';
    iziToastElStyle.style.overflow = 'hidden';
  }
}

//слухач для сабміту прибера дефолтні події лічильньник сторінки поверта до 1 по значенню з інпуту створює сторінку додає лічильник сторінки відобража кнопку додавання інших сторінок
gettingUserForm.addEventListener('submit', event => {
  event.preventDefault();
  userList.innerHTML = '';
  btnMorePosts.style.display = 'none';
  pageGrowthJs = 1;
  inputSearchListener = event.currentTarget.elements.search.value
    .toLowerCase()
    .trim();

  if (!inputSearchListener) {
    btnMorePosts.style.display = 'none';
    return;
  }
  addImage(inputSearchListener, pageGrowthJs, event);
  pageGrowthJs++;
  btnMorePosts.style.display = 'block';
});

//слухач для кнопки додає лічильник сторінки по значенню з інпута шука наступну сторінку
//обовязково додати async await щоб виконувалось після відмальовки картинок
btnMorePosts.addEventListener('click', async event => {
  pageGrowthJs++;

  if (!inputSearchListener) {
    return;
  }
  await addImage(inputSearchListener, pageGrowthJs);
  // ==============================================================
  //ПРОКРУТКА
  const elem = document.querySelector('.gallery-list-item');
  const rect = elem.getBoundingClientRect().height * 2;

  window.scrollBy({
    top: rect,
    behavior: 'smooth',
  });
});
