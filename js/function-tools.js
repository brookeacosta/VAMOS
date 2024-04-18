function pluck(arr, key) {
  return arr.map((elem) => elem[key]);
}

function uniq(arr) {
  return [...new Set(arr)];
}

function debounce(f, timeout) {
  let timer = null;

  function wrapped(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      
      f.apply(this, args);
      timer = null;
    }, timeout);
  }

  return wrapped;
}

window.ft = {
  pluck,
  uniq,
  debounce,
};

export { pluck, uniq };
