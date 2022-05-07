/* eslint-disable no-console */
// eslint-disable-next-line consistent-return
import {
  keyDownHandler, keyUpHandler, mouseDownHandler, mouseUpHandler,
} from './handlers';

import isFn from './helpers';
import en from './keysEN';
import ru from './keysRU';

console.log('localStorage.getItem()', localStorage.getItem('lang'));

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

function init(lang) {
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
  if (localStorage.lang === 'en') {
    localStorage.setItem('lang', 'ru');
    init(ru);
  } else if (localStorage.lang === 'ru') {
    localStorage.setItem('lang', 'en');
    init(en);
  }
}
console.log('перед запуском', typeof localStorage.getItem('lang'), ' =', typeof ru);

(function lookAtChangeLanguage() {
  const pressedKeys = new Set();
  const leftKeysForChangeLanguage = ['Shift', 'Control'];
  document.addEventListener('keydown', (event) => {
    console.log(event);
    pressedKeys.add(event.key);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of leftKeysForChangeLanguage) {
      if (!pressedKeys.has(key)) {
        return;
      }
    }
    pressedKeys.clear();
    document.querySelector('.keyboard').remove();
    changeLanguage();
    console.log('<<<---change language Function --->>> ');
  });
  document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key);
  });
}());
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);

let lang = localStorage.getItem('lang');
console.log('localStorage.lang', lang);
init(lang = localStorage.setItem('lang', 'en') || en);
