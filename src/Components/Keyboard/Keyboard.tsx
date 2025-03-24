import { KeyboardProps } from "../../interfaces";
import styles from './Keyboard.module.css';

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
     
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
    ];

    return (
        <div className={styles.keyboardContainer}>
            {keys.map((row, rowIndex) => (
           <div key={rowIndex}
                className={styles.keyboardRow}>
                
                {row.map((key) => (
                    <button key={key}
                            className={`${styles.keyButton} 
                                        ${key === 'ENTER' ? styles.enterKey : ''} 
                                        ${key === 'BACKSPACE' ? styles.backspaceKey : ''}`}
                            onClick={() => onKeyPress(key)}>
                                {key === 'BACKSPACE' ? '⌫' : key}
                    </button>
                ))}
            </div>
            ))}
        </div>
    );
};

export default Keyboard;