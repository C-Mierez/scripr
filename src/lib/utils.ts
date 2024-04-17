import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Receives an undisclosed amount of CSS variable names and returns a string of their concatenation to use as className.
// CSS variable names can be undefined.
export function cv(...cssVariables: (string | undefined)[]) {
    return cssVariables.filter((cssVariable) => cssVariable !== undefined).join(" ");
}
