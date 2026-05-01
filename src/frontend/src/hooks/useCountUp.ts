import { useEffect, useRef, useState } from "react";
export function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - (1 - t) ** 4;
    const tick = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(easeOut(elapsed) * target));
      if (elapsed < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);
  return count;
}
