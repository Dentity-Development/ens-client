// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (callback: Function, wait = 1000) => {
  let timeoutId: any = null;
  const func = (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
  func.clear = () => {
    window.clearTimeout(timeoutId);
  };
  return func;
};
