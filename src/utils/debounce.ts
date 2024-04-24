let interval;

export const debounce = (time: number, func: () => void) => {
  clearInterval(interval);
  interval = setTimeout(func, time);
}