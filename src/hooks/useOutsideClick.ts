import { useEffect, useRef } from "react";

export const useOutsideClick = (
  handler: () => void,
  listenCapturing = true,
) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};
