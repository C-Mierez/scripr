import css from "./FormCheckbox.module.scss";
import { Checkbox } from "@/components/ui/checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

interface FormCheckboxProps extends CheckboxPrimitive.CheckboxProps {
    id: string;
    label: string;
    description?: string;
}

export default function FormCheckbox({
    id,
    label,
    description,
    checked,
    disabled,
    onCheckedChange,
}: FormCheckboxProps) {
    return (
        <div className={css.formCheckbox}>
            <Checkbox id={id} checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
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
