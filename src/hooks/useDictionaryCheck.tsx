import { useState, useCallback } from 'react';
import _debounce from 'lodash.debounce';

export const useDictionaryCheck = (minWordLength: number) => {

    const apiUrl = import.meta.env.VITE_DICTIONARY_API_URL;
    const [isChecking, setIsChecking] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);
    const [lastChecked, setLastChecked] = useState<{ val: string, exists: boolean }>(null!);

    // use debounce for keypress delay
    const checkWord = useCallback(_debounce(async (word: string) => {
        // if no characters at all
        if (!word) {
            setExists(null);
            return;
        }

        // at least one character but not all is filled
        if (word.length < minWordLength) {
            setExists(false);
            return;
        }

        // prevent calling api again on same value
        if (lastChecked && word === lastChecked.val) {
            setExists(lastChecked.exists);
        }
        else {
            // for loader if needed
            setIsChecking(true);

            fetch(`${apiUrl}/${word}`)
                .then(res => {
                    setExists(res.ok);
                    setLastChecked({ val: word, exists: res.ok });
                })
                .catch((error) => {
                    console.error('Error checking the word:', error);
                    setExists(false);
                    setLastChecked({ val: word, exists: false });
                })
                .finally(() => setIsChecking(false));
        }
    }, 300), [lastChecked, apiUrl, minWordLength]);

    return {
        isChecking,
        exists,
        checkWord
    };
};