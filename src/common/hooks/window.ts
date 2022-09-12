import { useEffect, useState } from "react";
export function useWindowSize(ref: React.RefObject<HTMLDivElement>) {
  const [windowSize, setWindowSize] = useState({
    width: ref.current?.getBoundingClientRect().width ?? 0,
    height: ref.current?.getBoundingClientRect().height ?? 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const dimensions = ref.current?.getBoundingClientRect();
      setWindowSize({
        width: dimensions?.width ?? 0,
        height: dimensions?.height ?? 0,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]); // Empty array ensures that effect is only run on mount
  return windowSize;
}
