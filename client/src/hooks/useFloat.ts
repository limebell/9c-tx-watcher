import { useState, useEffect } from "react";
import debounce from "../utils/debounce";
type UseFloatResult = boolean;

function useFloat(ms?: number): UseFloatResult {
  const [float, setFloat] = useState(true);
  useEffect(() => {
    const paddingFunction = debounce(() => {
      setFloat(true);
    }, ms);
    const onScroll: () => void = () => {
      setFloat(false);
      paddingFunction();
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [ms]);
  return float;
}

export default useFloat;
