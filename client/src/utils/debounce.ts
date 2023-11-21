export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  time = 500
) => {
  let timer: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    const context = this as any;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, time);
  };
};