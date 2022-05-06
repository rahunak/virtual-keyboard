/* eslint-disable no-console */
// eslint-disable-next-line consistent-return
import keys from './keysEN';

function createElement(elem, innerText, classes, attr, attrValue) {
  try {
    const el = document.createElement(elem);
    el.textContent = innerText;
    el.classList.add(...classes.split(' '));
    el.setAttribute(attr, attrValue);
    return el;
  } catch {
    console.log('some wrong in createElement');
  }
}
function keyHandler(e) {
  console.log(e);
}

document.body.append(createElement('h1', 'RSS Виртуальная клавиатура', 'title'));
document.body.append(createElement('textarea', null, 'main__textarea'));
document.body.append(createElement('div', null, 'keyboard'));
const arrKeys = keys.flat(1);
arrKeys.map((el) => {
  console.log(el.code);
 
  const isSpace = el.code === 'Space';
  const isArrow = !!(el.code === 'ArrowUp' || el.code === 'ArrowLeft' || el.code === 'ArrowDown' || el.code === 'ArrowRight');
  const isFnBtn = !!((el.altKey || el.ctrlKey || el.metaKey || el.shiftKey || el.key === 'Enter' || el.key === 'CapsLock' || el.key === 'Tab' || el.key === 'Backspace'));
  document.querySelector('.keyboard').append(createElement(
    'div',
    (isArrow || el.metaKey) ? '' : el.key,
    (isFnBtn ? 'btn fn' : 'btn'),
    'data',
    `${isSpace ? el.code : ''}${isArrow ? el.key : ''}${isFnBtn ? el.key : ''}`
    ,
  ));
});
document.addEventListener('keydown', (e) => {
  console.log(e);
  console.log(e.code);
  console.log(e.key);
});
console.log('ArrowDown'.match(/Arrow/).length);
