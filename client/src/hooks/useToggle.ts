import { useCallback, useEffect, useRef, useState } from "react";

const useToggle = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const onToggle = useCallback(() => setOpen((prevSate) => !prevSate), []);

  const onOpen = useCallback(() => setOpen(true), []);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return {
    open,
    onToggle,
    onOpen,
    onClose,
    toggleRef,
  };
};

export default useToggle;
