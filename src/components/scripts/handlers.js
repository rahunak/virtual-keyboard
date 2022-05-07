import isFn from './helpers';

export function mouseDownHandler(e) {
  try {
    console.log(e);

    const el = e.target.closest('.btn').innerText.length;
  } catch {
    // console.error('Да ладно,ты прикалываешься,  ошибка ?!?');
  }
}
export function mouseUpHandler(e) {
  try {
    const el = e.target.closest('.btn').innerText.length;
    console.log(el);
  } catch {
    // console.error('Да ладно,ты прикалываешься,  ошибка ?!?');
  }
}

export function keyDownHandler(e) {
  try {
    e.preventDefault();
    document.querySelector(`[data=${e.code}]`).classList.add('btn_active');
    if (!isFn(e)) { document.querySelector('.main__textarea').value += e.key; }
    // console.log('textarea.value ', textarea.value);
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
