/* eslint-disable no-console */
import { isFnValue } from './helpers';

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
function addSymbol(symbol) {
  const textarea = document.querySelector('.main__textarea');
  const newText = textarea.value.split('');
  const positionCursor = textarea.selectionEnd;
  newText.splice(positionCursor, 0, symbol);
  textarea.value = newText.join('');
  textarea.selectionStart = positionCursor + 1;
  textarea.selectionEnd = positionCursor + 1;
}
function pressBtn(val) {
  const textarea = document.querySelector('.main__textarea');
  const newText = textarea.value.split('');
  const positionCursor = textarea.selectionEnd;

  if (val === 'Enter') {
    addSymbol('\n');
  } else if (val === 'Space' || val === '') {
    addSymbol(' ');
  } else if (val === 'Tab') {
    addSymbol('\t');
  } else if (val === 'Del' || val === 'Delete') {
    newText.splice(positionCursor, 1);
    textarea.value = newText.join('');
    textarea.selectionStart = positionCursor;
    textarea.selectionEnd = positionCursor;
  } else if (val === 'Backspace') {
    newText.splice(positionCursor - 1, 1);
    textarea.value = newText.join('');
    textarea.selectionStart = positionCursor - 1;
    textarea.selectionEnd = positionCursor - 1;
  } else if (val === 'ArrowUp') {
    addSymbol('\u2BC5');
  } else if (val === 'ArrowDown') {
    addSymbol('\u2BC6');
  } else if (val === 'ArrowLeft') {
    addSymbol('\u2BC7');
  } else if (val === 'ArrowRight') {
    addSymbol('\u2BC8');
  } else if (val === 'CapsLock') {
    document.querySelector(`[data=${val}]`).classList.toggle('btn_active');
    keyboardToUpperCase();
  }
}

export function mouseDownHandler(e) {
  try {
    if (!e.target.closest('.btn')) return;
    e.preventDefault();
    const currValue = e.target.closest('.btn').innerText;
    pressBtn(e.target.closest('.btn').getAttribute('data'));
    if (!isFnValue(currValue)) { document.querySelector('.main__textarea').value += currValue; }
  } catch (err) {
    console.error('Это не ошибка,происходит обработка события  mouseDownHandler', err);
  }
}

export function keyDownHandler(e) {
  try {
    e.preventDefault();
    if (!document.querySelector(`[data=${e.code}]`)) return;
    const currEl = document.querySelector(`[data=${e.code}]`);
    if (e.code !== 'CapsLock') { currEl.classList.add('btn_active'); }

    if (e.key === 'Shift' && !e.repeat) {
      // Обрабатываю нажатие Shift здесь т.к. необходимо проверять условие e.repeat-зажатие кнопки
      keyboardToUpperCase();
    }
    pressBtn(e.code);

    if (!isFnValue(e.code)) {
      console.log('нажал на кнопку', currEl.innerText);
      addSymbol(currEl.innerText);
    }
  } catch {
    console.error('Хватит нажимать кнопки, которых нет на моей Кавиатуре!');
  }
}
export function keyUpHandler(e) {
  try {
    if (!document.querySelector(`[data=${e.code}]`)) return;
    if (e.key === 'Shift') {
      // Удивлён что при отпускании  shiftKey===false
      document.querySelector(`[data=${e.code}]`).classList.remove('btn_active');
      keyboardToUpperCase();
    } else if (e.key === 'CapsLock') {
      // Убираем снятие активности с кнопки CapsLock
      return;
    } else {
      document.querySelector(`[data=${e.code}]`).classList.remove('btn_active');
    }
  } catch (err) {
    console.error('Хватит отпускать кнопки, которых нет на моей Кавиатуре!', err);
  }
}
