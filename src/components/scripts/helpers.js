function isFn(el) {
  return !!((el.altKey || el.ctrlKey || el.metaKey || el.shiftKey || el.key === 'Enter' || el.key === 'CapsLock' || el.key === 'Tab' || el.key === 'Backspace' || el.code === 'Delete' || el.code === 'ArrowUp' || el.code === 'ArrowLeft' || el.code === 'ArrowDown' || el.code === 'ArrowRight' || el.code === 'AltRight'));
}
export default isFn;
