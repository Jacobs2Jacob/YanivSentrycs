import React from 'react';
import { SquareInputProps } from '../../interfaces';
import styles from './SquareInput.module.css';

/**
 * SquareInput is a presentation of string input
 * No input modification can be made
 * 
 * @param {number} length - The const length of the empty squares.
 * @param {string} input - The input.
 * @param {boolean} error - The error indication.
 */
const SquareInput: React.FC<SquareInputProps> = ({ length, input, hasError })  => { 
     
    return (
        <div className={styles.squareContainer}>
            {Array(length)
                .fill('')
                .map((_, i) => (
                    <div key={i}
                         className={`${styles.square} ${hasError === null ? '' : (hasError === true ? styles.error : styles.correct)}`}>
                        {input[i] || ''}
                    </div>
            ))}
        </div>
    );
};

export default SquareInput;