import { useEffect, useState } from "react"; 
import Keyboard from "../Keyboard/Keyboard"; 
import SquareInput from "../SquareInput/SquareInput";
import { useActionListener } from "../../hooks/useActionListener";
import { useDictionaryCheck } from "../../hooks/useDictionaryCheck";
import styles from './App.module.css';

const App: React.FC = () => {
    const [input, setInput] = useState<string[]>([]); 
    const inputLength = 5;
    const { checkWord, exists } = useDictionaryCheck(inputLength);

    const {
        registerListener,
        emit,
        removeListener
    } = useActionListener();

    useEffect(() => {
        // Add listener to the action
        registerListener("PRINT", (data) =>
            console.log(`Don't tell me what I ${data} or ${data}'t do`)
        );

        // Add another listener for the action
        registerListener("PRINT", (data) =>
            console.log(`I eat pickles right of the ${data}`)
        );

        // Execute all listeners with the data provided
        emit("PRINT", "Can");

        // Remove all listeners assigned to the action
        removeListener("PRINT");

        // Execute an unregistered action should be resulted with an error
        emit("PRINT", "Can");

        // better way to remove resources
        //return () => {
        //    removeListener('PRINT');
        //};
    }, []);

    // event emitted
    const handleKeyPress = (key: string) => {
        if (key === 'BACKSPACE') {
            if (input.length > 0) {
                setInput((prev) => {
                    const cloned = [...prev];
                    cloned.pop();
                    return cloned;
                });
            }
        }
        else if (key === 'ENTER') {
            checkWord(input.join(''));
        }
        else if (input.length < inputLength) {
            setInput((prev) => {
                const cloned = [...prev];
                cloned.push(key);
                return cloned;
            });
        }
    };

    return (
        <div className="container">
            {/* Input */}
            <SquareInput length={inputLength} input={input} hasError={exists === null ? null : !exists} />

            {/* Keyboard */}
            <div className={styles.keyboardContainer}>
                <Keyboard onKeyPress={handleKeyPress} />
            </div>
        </div>
    );
};

export default App;