/* eslint-disable no-console */
// eslint-disable-next-line consistent-return
// import {
//   keyDownHandler, keyUpHandler, mouseDownHandler, keyboardToUpperCase,
// } from './handlers';
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
  try {
    const el = document.createElement(elem);
    if (innerHTML)el.append(...innerHTML);
    if (classes) el.classList.add(...classes.split(' '));
    if (attr && attrValue) { el.setAttribute(attr, attrValue); }
    if (otherAttr && otherAttrValue) { el.setAttribute(otherAttr, otherAttrValue); }
    return el;
  } catch {
    console.log('some wrong in createElement');
  }
  return true;
}

document.body.append(createElement('h1', 'RSS Виртуальная клавиатура', 'title'));
document.body.append(createElement('textarea', null, 'main__textarea', 'id', 'textatea'));
document.body.append(createElement('p', 'Смена языка:  левый Alt + Ctrl'));

function changeLanguageInLocalStorage() {
  console.log('был', localStorage);
  if (localStorage.lang === 'en') {
    localStorage.setItem('lang', 'ru');
    console.log('стал', localStorage);
  } else if (localStorage.lang === 'ru') {
    localStorage.setItem('lang', 'en');
    console.log('стал', localStorage);
  }
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
      : elemEn.key;

    const ruTextObj = (isFnValue(elemRu.key))
      ? `${correctTextInFnBtns(elemRu)}`
      : elemRu;

    const markupElement = createElement(
      'div',
      [
        createElement(
          'span',
          [
            createElement('span', `${(isFnValue(elemEn.code)) ? enTextObj : ruTextObj.key}`, 'caseDown hidden'),
            createElement('span', `${
              // eslint-disable-next-line no-nested-ternary
              (isFnValue(elemEn.code))
                ? enTextObj
                : ((ruTextObj.hasOwnProperty('secondValue')) ? ruTextObj.secondValue : ruTextObj.key.toUpperCase())
            }`, 'caseUp hidden'),
            createElement('span', `${(isFnValue(elemEn.code)) ? enTextObj : ruTextObj.key.toUpperCase()}`, 'caps hidden'),
            createElement('span', `${(isFnValue(elemEn.code)) ? enTextObj : ((ruTextObj.hasOwnProperty('secondValue')) ? ruTextObj.secondValue : ruTextObj.key)}`, 'shiftCaps hidden'),
          ],
          'ru hidden',
        ),
        createElement(
          'span',
          [
            createElement('span', `${enTextObj}`, 'caseDown'),
            createElement('span', `${(isFnValue(elemRu.code)) ? enTextObj : enTextObj.toUpperCase()}`, 'caseUp hidden'),
            createElement('span', `${(isFnValue(elemRu.code)) ? enTextObj : enTextObj.toUpperCase()}`, 'caps hidden'),
            createElement('span', `${enTextObj}`, 'shiftCaps hidden'),
          ],
          'en',
        )],
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
  createMarkup();
  changeLanguage();
  addEventListenersOnButtons();
}

console.log('localStorage.lang перед запуском init', localStorage.lang);
init();

document.addEventListener('keydown', (e) => {
  console.log('keydown', e);
});
document.addEventListener('keyup', (e) => {
  console.log('keyup', e);
});
