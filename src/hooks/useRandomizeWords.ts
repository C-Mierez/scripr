import { useRef, useState } from "react";

type RandomizeWordsProps = {
    immutableItems: string[];
    sequentialReveal: boolean;
    callback?: (randomWord: string) => void;
    randomChars?: string;
    intervalTime?: number;
    amountPerChar?: number;
};

export const useRandomizeWords = ({
    immutableItems,
    callback,
    randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    intervalTime = 30,
    amountPerChar = 3,
    sequentialReveal = true,
}: RandomizeWordsProps) => {
    const [items, setItems] = useState<string[]>([...immutableItems]);
    const isRandomizing = useRef(false);

    const randomize = (index = 0) => {
        let iterations = 0;
        isRandomizing.current = true;

        const interval = setInterval(() => {
            const randomWord = items[index]!.split("")
                .map((_, charIndex) => {
                    // @dev Change <= to < to animate first char too
                    if (sequentialReveal && charIndex < iterations)
                        return immutableItems[index]![charIndex]!;

                    return randomChars[
                        Math.floor(Math.random() * randomChars.length)
                    ];
                })
                .join("");
            setItems((prev) => {
                const newItems = [...prev];
                newItems[index] = randomWord;
                return newItems;
            });

            if (callback) callback(randomWord);

            if (iterations >= immutableItems[index]!.length) {
                isRandomizing.current = false;
                clearInterval(interval);
            }

            iterations += 1 / amountPerChar;
        }, intervalTime);
    };

    return {
        immutableItems,
        items,
        setItems,
        randomize,
        isRandomizing,
    };
};
