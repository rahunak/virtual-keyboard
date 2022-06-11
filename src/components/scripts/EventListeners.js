import {
  keyboardToUpperCase, keyDownHandler, keyUpHandler, mouseDownHandler,
} from './handlers';

function addEventListenersOnButtons() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('mousedown', mouseDownHandler);

  const ShiftLeft = document.body.querySelector('.btn[data="ShiftLeft"]');
  ShiftLeft.addEventListener('mousedown', () => {
    ShiftLeft.classList.add('btn_active');
    keyboardToUpperCase();
  });
  ShiftLeft.addEventListener('mouseup', () => {
    ShiftLeft.classList.remove('btn_active');
    keyboardToUpperCase();
  });

  const ShiftRight = document.body.querySelector('.btn[data="ShiftRight"]');
  ShiftRight.addEventListener('mousedown', () => {
    ShiftRight.classList.add('btn_active');
    keyboardToUpperCase();
  });
  ShiftRight.addEventListener('mouseup', () => {
    ShiftRight.classList.remove('btn_active');
    keyboardToUpperCase();
  });
}
export default addEventListenersOnButtons;
