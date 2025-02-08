import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 900): T {
  const [debouncedQuery, setDebouncedQuery] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value, delay]);

  return debouncedQuery;
}
