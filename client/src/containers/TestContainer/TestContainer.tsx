import React, { useState, useEffect } from "react";

function TestContainer(): JSX.Element {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev: number) => {
        return prev + 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <h1>This is Count Test: {count}</h1>
    </div>
  );
}

export default TestContainer;
