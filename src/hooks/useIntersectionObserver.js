import { useEffect, useState, useMemo } from "react";

export const useIntersectionObserver = (options, targetRef) => {
  const [isVisibile, setIsVisible] = useState();
  const intersection = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(intersection, options);
    const current = targetRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [targetRef, options]);

  return isVisibile;
};
