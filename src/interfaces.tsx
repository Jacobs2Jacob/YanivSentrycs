
export interface KeyboardProps {
    onKeyPress: (key: string) => void;
}

export interface SquareInputProps {
    length: number;
    input: string[];
    hasError: boolean | null;
}