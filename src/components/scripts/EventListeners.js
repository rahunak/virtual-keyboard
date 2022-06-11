import {
  keyDownHandler, keyUpHandler, mouseDownHandler,
} from './handlers';

function addEventListenersOnButtons() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('mousedown', mouseDownHandler);
}
export default addEventListenersOnButtons;
