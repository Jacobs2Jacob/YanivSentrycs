import { useRef, useEffect, useCallback } from 'react';

const useDebounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!);

    const debounced = useCallback((...args: Parameters<T>) => {

        // clear resources
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // set new timeout
        timeoutRef.current = setTimeout(() => {
            fn(...args);
        }, delay);

    }, [fn, delay]);
     
    // clear on unmount
    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return debounced;
};

export default useDebounce;