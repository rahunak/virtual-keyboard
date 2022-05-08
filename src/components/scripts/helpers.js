export function isFn(el) {
  return !!((el.altKey || el.ctrlKey || el.metaKey || el.shiftKey || el.key === 'Enter' || el.key === 'CapsLock' || el.key === 'Tab' || el.key === 'Backspace' || el.code === 'Delete' || el.code === 'ArrowUp' || el.code === 'ArrowLeft' || el.code === 'ArrowDown' || el.code === 'ArrowRight' || el.code === 'AltRight'));
}
export function isFnValue(val) {
  if (val === 'Enter' || val === 'CapsLock' || val === 'Tab' || val === 'Backspace' || val === 'Delete' || val === 'ArrowUp' || val === 'ArrowLeft' || val === 'ArrowDown' || val === 'ArrowRight' || val === 'AltRight' || val === 'Del' || val === 'Shift' || val === 'Ctrl' || val === 'Alt' || val === 'Win') {
    return true;
  }
  return false;
}
