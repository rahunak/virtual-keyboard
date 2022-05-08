/* eslint-disable no-console */
// eslint-disable-next-line consistent-return
import {
  keyDownHandler, keyUpHandler, mouseDownHandler, mouseUpHandler, keyboardToUpperCase,
} from './handlers';

import { isFn } from './helpers';
import en from './keysEN';
import ru from './keysRU';

function createElement(elem, innerText, classes, attr, attrValue = null) {
  try {
    const el = document.createElement(elem);
    if (innerText)el.textContent = innerText;
    if (classes) el.classList.add(...classes.split(' '));
    if (attr && attrValue) { el.setAttribute(attr, attrValue); }
    return el;
  } catch {
    console.log('some wrong in createElement');
  }
}

document.body.append(createElement('h1', 'RSS Виртуальная клавиатура', 'title'));
document.body.append(createElement('textarea', null, 'main__textarea', 'id', 'textatea'));
document.body.append(createElement('p', 'Смена языка Shift + Ctrl'));

function changeLanguageInLocalStorage() {
  console.log('меняю язык. был', localStorage);
  if (localStorage.lang === 'en') {
    localStorage.setItem('lang', 'ru');
    console.log('стал', localStorage);
  } else if (localStorage.lang === 'ru') {
    localStorage.setItem('lang', 'en');
    console.log('стал', localStorage);
  }
}

function createMarkup() {
  let lang;
  if (localStorage.lang) {
    if (localStorage.lang === 'ru') {
      lang = ru;
    } else if (localStorage.lang === 'en') {
      lang = en;
    }
  } else {
    lang = en;
  }
  document.body.append(createElement('div', null, 'keyboard'));
  const arrKeys = lang.flat(1);
  arrKeys.map((el) => {
    const isDelete = el.code === 'Delete';
    const isArrow = !!(el.code === 'ArrowUp' || el.code === 'ArrowLeft' || el.code === 'ArrowDown' || el.code === 'ArrowRight');

    const markupElement = createElement(
      'div',
      (isArrow || el.metaKey || isDelete || el.ctrlKey)
        ? `${isDelete ? 'Del' : ''}${el.metaKey ? 'Win' : ''}${el.ctrlKey ? 'Ctrl' : ''}`
        : el.key,
      (isFn(el) ? 'btn fn' : 'btn'),
      'data',
      el.code
      ,
    );
    document.querySelector('.keyboard').append(markupElement);
  });
}

function changeLanguage() {
  const pressedKeys = new Set();
  const keysForChangingLanguage = ['Shift', 'Control'];

  document.addEventListener('keydown', (event) => {
    pressedKeys.add(event.key);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keysForChangingLanguage) {
      if (!pressedKeys.has(key)) {
        return;
      }
    }
    pressedKeys.clear();
    changeLanguageInLocalStorage();
    document.querySelector('.keyboard').remove();
    createMarkup();
  });
  document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key);
  });
}

function init() {
  createMarkup();
  changeLanguage();
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);

console.log('localStorage.lang перед запуском init', localStorage.lang);
init();

document.querySelector('[data="ShiftRight"]').addEventListener('click', keyboardToUpperCase);
