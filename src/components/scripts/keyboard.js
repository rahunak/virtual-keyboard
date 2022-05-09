/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */

import addEventListenersOnButtons from './EventListeners';
import {
  isFnValue, correctTextInFnBtns,
} from './helpers';
import en from './keysEN';
import ru from './keysRU';

function createElement(
  elem,
  innerHTML,
  classes,
  attr,
  attrValue = null,
  otherAttr = null,
  otherAttrValue = null,
) {
  const el = document.createElement(elem);
  if (innerHTML)el.append(...innerHTML);
  if (classes) el.classList.add(...classes.split(' '));
  if (attr && attrValue) { el.setAttribute(attr, attrValue); }
  if (otherAttr && otherAttrValue) { el.setAttribute(otherAttr, otherAttrValue); }
  return el;
}
document.title = 'Virtual Keyboard';
document.body.append(createElement('h1', 'RSS Виртуальная клавиатура', 'title'));
document.body.append(createElement('textarea', null, 'main__textarea', 'id', 'textatea'));

function changeLanguageInLocalStorage() {
  if (localStorage.lang === 'en') {
    localStorage.setItem('lang', 'ru');
  } else if (localStorage.lang === 'ru') {
    localStorage.setItem('lang', 'en');
  }
}

function defLangEn(str) {
  if (localStorage.lang === str) return 'langEn';

  return 'hidden';
}
function createMarkup() {
  document.body.append(createElement('div', null, 'keyboard'));
  const ENG = en.flat(1);
  const RUS = ru.flat(1);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ENG.length; i++) {
    const elemEn = ENG[i];
    const elemRu = RUS[i];

    const enTextObj = (isFnValue(elemEn.code))
      ? `${correctTextInFnBtns(elemEn)}`
      : elemEn;

    const ruTextObj = (isFnValue(elemRu.code))
      ? `${correctTextInFnBtns(elemRu)}`
      : elemRu;

    const markupElement = createElement(
      'div',
      [
        createElement(
          'span',
          [
            createElement('span', `${(isFnValue(elemEn.code)) ? (enTextObj.key || enTextObj) : ruTextObj.key}`, `caseDown ${defLangEn('ru')}`),
            createElement('span', `${(isFnValue(elemEn.code)) ? enTextObj.key || enTextObj : ((ruTextObj.hasOwnProperty('secondValue')) ? ruTextObj.secondValue : ruTextObj.key.toUpperCase())}`, 'caseUp hidden'),
            createElement('span', `${(isFnValue(elemEn.code)) ? enTextObj.key || enTextObj : ruTextObj.key.toUpperCase()}`, 'caps hidden'),
            createElement('span', `${(isFnValue(elemEn.code)) ? enTextObj.key || enTextObj : ((ruTextObj.hasOwnProperty('secondValue')) ? ruTextObj.secondValue : ruTextObj.key)}`, 'shiftCaps hidden'),
          ],
          `ru ${defLangEn('ru')}`,
        ),

        createElement(
          'span',
          [
            createElement('span', `${enTextObj.key || enTextObj}`, `caseDown ${defLangEn('en')}`),
            createElement('span', `${(isFnValue(elemRu.code)) ? enTextObj.key || enTextObj : ((enTextObj.hasOwnProperty('secondValue')) ? enTextObj.secondValue : enTextObj.key.toUpperCase())}`, 'caseUp hidden'),
            createElement('span', `${(isFnValue(elemRu.code)) ? enTextObj.key || enTextObj : enTextObj.key.toUpperCase()}`, 'caps hidden'),
            createElement('span', `${enTextObj.key || enTextObj}`, 'shiftCaps hidden'),
          ],
          `en ${defLangEn('en')}`,
        ),

      ],
      isFnValue(elemEn.code) ? 'btn fn' : 'btn',
      'data',
      elemEn.code,
      'key',
      isFnValue(elemEn.code) ? 'fn' : 'key',
    );
    document.querySelector('.keyboard').append(markupElement);
  }
}

function changeLanguageMarkup() {
  const keysRu = document.querySelectorAll('.ru');
  keysRu.forEach((el) => el.classList.toggle('hidden'));
  const keysEn = document.querySelectorAll('.en');
  keysEn.forEach((el) => el.classList.toggle('hidden'));
  const caseDown = document.querySelectorAll('.caseDown');
  caseDown.forEach((el) => el.classList.toggle('hidden'));
}

function changeLanguage() {
  const pressedKeys = new Set();
  const keysForChangingLanguage = ['Control', 'Alt'];

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
    changeLanguageMarkup();
  });
  document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key);
  });
}

function init() {
  if (!localStorage.lang) {
    localStorage.setItem('lang', 'en');
  }
  createMarkup();
  changeLanguage();
  addEventListenersOnButtons();
}

init();

document.body.append(createElement('p', 'Клавиатура создана в операционной системе Windows'));
document.body.append(createElement('p', 'Смена языка:  левый Alt + Ctrl'));
