import { useCallback, useRef } from "react";
import { ActionListener } from "../types";

export const useActionListener = () => {
    // using ref for holding non render dependent data
    const listenersRef = useRef<Record<string, ActionListener[]>>({});
     
    // using callbacks for function memoization
    const registerListener = useCallback((action: string, listener: ActionListener) => {
        listenersRef.current[action] = [...(listenersRef.current[action] || []), listener];
    }, []);

    const removeListener = useCallback((action: string) => {
        delete listenersRef.current[action];
    }, []);

    const emit = useCallback((action: string, data: any) => {
        const actionListeners = listenersRef.current[action];

        if (!actionListeners) {
            console.warn(`No listeners for action "${action}"`);
            return;
        }

        actionListeners.forEach(listenersRef => listenersRef(data));
    }, []);

    return {
        registerListener,
        removeListener,
        emit
    };
};