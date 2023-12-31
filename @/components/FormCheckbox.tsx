import css from "./FormCheckbox.module.scss";
import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckboxProps {
    id: string;
    label: string;
    description?: string;
}

export default function FormCheckbox({ id, label, description }: FormCheckboxProps) {
    return (
        <div className={css.formCheckbox}>
            <Checkbox id={id} />
            <div className={css.content}>
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
        </div>
    );
}
