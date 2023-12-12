import { Transition } from "framer-motion";

export const bezierEase = [0.76, 0, 0.24, 1];

export const shortDuration = 0.3;
export const mediumDuration = 0.5;
export const duration = 0.8;

export const delay = 0.1;

export const transition = { duration: duration, ease: bezierEase } as Transition;

export const layoutTransition = { duration: shortDuration, bezierEase };
