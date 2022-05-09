export function isFnValue(val) {
  if (val === 'Enter' || val === 'CapsLock' || val === 'Tab' || val === 'Backspace'
  || val === 'Delete' || val === 'Del'
  || val === 'ArrowUp' || val === 'ArrowLeft' || val === 'ArrowDown' || val === 'ArrowRight'
  || val === 'Shift' || val === 'ShiftLeft' || val === 'ShiftRight'
  || val === 'Ctrl' || val === 'ControlLeft' || val === 'ControlRight'
  || val === 'Alt' || val === 'AltLeft' || val === 'AltRight'
  || val === 'MetaLeft' || val === 'MetaRight' || val === 'Win') {
    return true;
  }
  return false;
}

function isArrow(el) { return !!(el.code === 'ArrowUp' || el.code === 'ArrowLeft' || el.code === 'ArrowDown' || el.code === 'ArrowRight'); }

export function correctTextInFnBtns(el) {
  if (el.code === 'Delete') return 'Del';
  if (el.key === 'CapsLock') return 'CapsLock';
  if (el.key === 'Shift') return 'Shift';
  if (el.key === 'Tab') return 'Tab';
  if (el.key === 'Backspace') return 'Backspace';
  if (el.key === 'Enter') return 'Enter';
  if (el.metaKey) return 'Win';
  if (el.ctrlKey) return 'Ctrl';
  if (el.altKey) return 'Alt';
  if (isArrow(el)) return '';
  return '';
}
