export const splitPhraseIntoParagraphs = (
    phrase: string,
    paragraphRefs?: React.MutableRefObject<HTMLParagraphElement[]>,
    spanRefs?: React.MutableRefObject<HTMLSpanElement[]>
) => {
    const paragraphs: React.ReactNode[] = [];
    phrase.split(" ").forEach((word, index) => {
        const letters = splitWordIntoSpan(word, spanRefs);
        paragraphs.push(
            paragraphRefs === undefined ? (
                <p key={`word=${index}`}>{letters} </p>
            ) : (
                <p key={`word=${index}`} ref={(e) => paragraphRefs.current.push(e!)}>
                    {letters}
                </p>
            )
        );
    });
    return paragraphs;
};

export const splitWordIntoSpan = (word: string, spanRefs?: React.MutableRefObject<HTMLSpanElement[]>) => {
    const letters: React.ReactNode[] = [];
    word.split("").forEach((letter, index) => {
        spanRefs === undefined
            ? letters.push(<span key={`letter=${index}`}>{letter}</span>)
            : letters.push(
                  <span key={`letter=${index}`} ref={(e) => spanRefs.current.push(e!)}>
                      {letter}
                  </span>
              );
    });
    return letters;
};

/* ////////////////////////////////////////////////////////////////////////// */
/*                                     CSS                                    */
/* ////////////////////////////////////////////////////////////////////////// */
// Receives an undisclosed amount of CSS variable names and returns a string of their concatenation to use as className.
// CSS variable names can be undefined.
export function CSSVariables(...cssVariables: (string | undefined)[]) {
    return cssVariables.filter((cssVariable) => cssVariable !== undefined).join(" ");
}
