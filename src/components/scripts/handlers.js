/* eslint-disable no-console */
import { isFnValue } from './helpers';

function pressBtn(val) {
  console.log('val->>>', val);
  const textarea = document.querySelector('.main__textarea');
  const newText = textarea.value.split('');
  const positionCursor = textarea.selectionEnd;
  function addSymbol(symbol) {
    newText.splice(positionCursor, 0, symbol);
    textarea.value = newText.join('');
    textarea.selectionStart = positionCursor + 1;
    textarea.selectionEnd = positionCursor + 1;
  }
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
  }
}

export function mouseDownHandler(e) {
  try {
    console.log(' e.target.closest(".btn")->>>', e.target.closest('.btn'));
    if (!e.target.closest('.btn')) return;
    e.preventDefault();
    const currValue = e.target.closest('.btn').innerText;
    pressBtn(e.target.closest('.btn').getAttribute('data'));
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
