let debounceTimeout: number;

export function debounce(func: () => void, delay: number): () => void {
  return function () {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = window.setTimeout(func, delay);
  };
}
