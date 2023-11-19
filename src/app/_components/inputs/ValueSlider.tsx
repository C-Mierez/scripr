"use client";

import css from "./ValueSlider.module.scss";

export type ValueSliderProps = {
    title: string;
    label: string;
    min: number;
    max: number;
    maxValueLabel?: string;
    step: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ValueSlider(props: ValueSliderProps) {
    const isMaxed = () => props.maxValueLabel !== undefined && props.max == props.value;
    return (
        <div className={css.valueSlider}>
            <h4>{props.title}</h4>
            <div className={css.labelRow}>
                <label>
                    <span className={isMaxed() ? css.maxed : ""}>{isMaxed() ? props.maxValueLabel : props.value}&nbsp;</span>
                    {props.label}
                </label>
            </div>
            <input type="range" min={props.min} max={props.max} defaultValue={props.value} step={props.step} onChange={props.onChange} />
        </div>
    );
}
