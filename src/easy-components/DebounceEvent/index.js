/* eslint-disable default-param-last */
// eslint-disable-next-line no-unused-vars
const debounceEvent =
  (fn, wait = 1500, time) =>
  (...args) => {
    args[0].persist();
    clearTimeout(time, (time = setTimeout(() => fn(...args), wait)));
  };

export default debounceEvent;
