import { isFn, isFnValue } from './helpers';

export function mouseDownHandler(e) {
  try {
    const currValue = e.target.closest('.btn').innerText;
    console.log(currValue);
    if (!isFnValue(currValue)) { document.querySelector('.main__textarea').value += currValue; }
  } catch {
    // console.error('Да ладно,ты прикалываешься,  ошибка ?!?');
  }
}
export function mouseUpHandler(e) {
  try {
    const el = e.target.closest('.btn').innerText.length;
  } catch {
    // console.error('Да ладно,ты прикалываешься,  ошибка ?!?');
  }
}

export function keyDownHandler(e) {
  try {
    console.log(e);
    e.preventDefault();
    const currEl = document.querySelector(`[data=${e.code}]`);
    currEl.classList.add('btn_active');
    // Баг с клавишей AltGraph выводит ControlLeft вне моего массива клавиш
    if (!isFn(e) && e.key !== 'Control' && e.key !== 'Alt') { document.querySelector('.main__textarea').value += currEl.innerText; }
  } catch {
    console.error('Хватит нажимать кнопки, которых нет на моей Кавиатуре!');
  }
}
export function keyUpHandler(e) {
  try {
    document.querySelector(`[data=${e.code}]`).classList.remove('btn_active');
  } catch {
    console.error('Хватит отпускать кнопки, которых нет на моей Кавиатуре!');
  }
}
export function keyboardToUpperCase() {
  const btns = document.getElementsByClassName('btn');
  console.log(btns);
}
