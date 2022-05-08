export function isFnValue(val) {
  if (val === 'Enter' || val === 'CapsLock' || val === 'Tab' || val === 'Backspace'
  || val === 'Delete' || val === 'ArrowUp' || val === 'ArrowLeft' || val === 'ArrowDown'
  || val === 'ArrowRight' || val === 'AltRight' || val === 'Del'
  || val === 'Shift' || val === 'ShiftLeft' || val === 'ShiftRight'
  || val === 'Ctrl' || val === 'ControlLeft' || val === 'ControlRight'
  || val === 'Alt' || val === 'AltLeft' || val === 'AltRight'
  || val === 'MetaLeft' || val === 'MetaRight'
  || val === 'Win' || val === 'ArrowRight' || val === 'AltRight') {
    return true;
  }
  return false;
}
export function isDelete(el) { return el.code === 'Delete'; }
export function isArrow(el) { return !!(el.code === 'ArrowUp' || el.code === 'ArrowLeft' || el.code === 'ArrowDown' || el.code === 'ArrowRight'); }
