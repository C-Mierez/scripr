import css from "./ValueCheckbox.module.scss";

export type ValueCheckboxProps = {
    title: string;
    label: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ValueCheckbox(props: ValueCheckboxProps) {
    return (
        <div className={css.valueCheckbox}>
            <h4>{props.title}</h4>
            <div className={css.labelRow}>
                <label>{props.label}</label>
                <input type="checkbox" checked={props.value} onChange={props.onChange} />
            </div>
        </div>
    );
}
