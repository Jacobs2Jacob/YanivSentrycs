import { useState, useCallback } from 'react';

export const useDictionaryCheck = (minWordLength: number) => {
    const [isChecking, setIsChecking] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);
    const apiUrl = import.meta.env.VITE_DICTIONARY_API_URL;

    const checkWord = useCallback(async (word: string) => {
        // if no characters at all
        if (!word) {
            setExists(null);
            return;
        }

        // at least one character
        if (word.length < minWordLength) {
            setExists(false);
            return;
        }

        // for loader if needed
        setIsChecking(true); 

        fetch(`${apiUrl}/${word}`)
            .then(res => { 
                setExists(res.ok);
            })
            .catch((error) => {
                console.error('Error checking the word:', error);
                setExists(false);
            })
            .finally(() => setIsChecking(false));
    }, []);

    return {
        isChecking,
        exists,
        checkWord
    };
};