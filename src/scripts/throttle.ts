export function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  limit: number,
): (...args: T) => void {
  let throttleTimeout: boolean = false;

  return function (...args: T) {
    if (!throttleTimeout) {
      func(...args);
      throttleTimeout = true;
      setTimeout(() => {
        throttleTimeout = false;
      }, limit);
    }
  };
}
