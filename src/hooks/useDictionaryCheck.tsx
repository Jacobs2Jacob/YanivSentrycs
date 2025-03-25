import { useState, useCallback } from 'react'; 
import useDebounce from './useDebounce';

export const useDictionaryCheck = (minWordLength: number) => {

    const apiUrl = import.meta.env.VITE_DICTIONARY_API_URL;
    const [isChecking, setIsChecking] = useState(false);
    const [exists, setExists] = useState<boolean | null>(null);
    const [lastChecked, setLastChecked] = useState<{ val: string, exists: boolean }>(null!);

    const checkWordCallback = useCallback(async (word: string) => {
        // if no characters at all
        if (!word) {
            setExists(null);
        }
        // at least one character but not all is filled
        else if (word.length < minWordLength) {
            setExists(false);
        }
        // prevent calling api again on same value
        else if (lastChecked && word === lastChecked.val) {
            setExists(lastChecked.exists);
        }
        else
        {
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
    }, [lastChecked, apiUrl, minWordLength]);

    // use debounce for keypress delay
    const checkWord = useDebounce(checkWordCallback, 300);

    return {
        isChecking,
        exists,
        checkWord
    };
};
