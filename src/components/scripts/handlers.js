/* eslint-disable no-console */
import { isFnValue } from './helpers';

function pressBtn(val) {
  if (val === 'Enter') {
    document.querySelector('.main__textarea').value += '\n';
  } else if (val === 'Space' || val === '') {
    document.querySelector('.main__textarea').value += ' ';
  } else if (val === 'Tab') {
    document.querySelector('.main__textarea').value += '\t';
  } else if (val === 'Del' || val === 'Delete') {
    const textarea = document.querySelector('.main__textarea');
    console.log('textarea.selectionEnd', textarea.selectionEnd);
    const newText = textarea.value.split('');
    newText.splice(textarea.selectionEnd, 1);
    textarea.value = newText.join('');
  } else if (val === 'Backspace') {
    document.querySelector('.main__textarea').value = document.querySelector('.main__textarea').value.slice(0, document.querySelector('.main__textarea').value.length - 1);
  }
}

function pressArrow(val) {
  if (val === 'ArrowDown') {
    document.querySelector('.main__textarea').value += '\u2BC6';
  }
  if (val === 'ArrowLeft') {
    document.querySelector('.main__textarea').value += '\u2BC7';
  }
  if (val === 'ArrowRight') {
    document.querySelector('.main__textarea').value += '\u2BC8';
  }
  if (val === 'ArrowUp') {
    document.querySelector('.main__textarea').value += '\u2BC5';
  }
}

export function mouseDownHandler(e) {
  try {
    if (!e.target.closest('.btn')) return;
    const currValue = e.target.closest('.btn').innerText;
    pressArrow(e.target.closest('.btn').getAttribute('data'));
    pressBtn(currValue);
    if (!isFnValue(currValue)) { document.querySelector('.main__textarea').value += currValue; }
  } catch (err) {
    console.error('Это не ошибка,происходит обработка события  mouseDownHandler', err);
  }
}
export function keyboardToUpperCase() {
  try {
    document.querySelectorAll('[key="key"]').forEach((el) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const child of el.children) {
        if (!child.classList.contains('hidden')) {
          child.querySelector('.caseDown').classList.toggle('hidden');
          child.querySelector('.caseUp').classList.toggle('hidden');
        }
      }
    });
  } catch (err) {
    console.error('Ошибка тут keyboardToUpperCase', err);
  }
}

export function keyDownHandler(e) {
  try {
    if (!document.querySelector(`[data=${e.code}]`)) return;
    e.preventDefault();
    const currEl = document.querySelector(`[data=${e.code}]`);
    currEl.classList.add('btn_active');
    if ((e.key === 'Shift' && !e.repeat) || (e.key === 'CapsLock')) {
      keyboardToUpperCase();
    }
    pressBtn(e.code);
    pressArrow(e.code);

    if (!isFnValue(e.code)) { document.querySelector('.main__textarea').value += currEl.innerText; }
  } catch {
    console.error('Хватит нажимать кнопки, которых нет на моей Кавиатуре!');
  }
}
export function keyUpHandler(e) {
  try {
    if (e.key === 'Shift') {
      // Удивлён что при отпускании  shiftKey===false
      keyboardToUpperCase();
    }
    if (!document.querySelector(`[data=${e.code}]`)) return;
    document.querySelector(`[data=${e.code}]`).classList.remove('btn_active');
  } catch (err) {
    console.error('Хватит отпускать кнопки, которых нет на моей Кавиатуре!', err);
  }
}
