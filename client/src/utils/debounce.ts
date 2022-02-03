type DebounceResult = () => void;

function debounce(cb: () => void, ms?: number): DebounceResult {
  let timer: NodeJS.Timeout | null = null;
  const paddingFunction: () => void = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb(), ms);
  };
  return paddingFunction;
}

export default debounce;
