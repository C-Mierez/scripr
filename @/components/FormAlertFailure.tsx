import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

// import css from "./FormAlertFailure.module.scss";

interface FormAlertFailureProps {
    title?: string;
    message?: string;
}

export default function FormAlertFailure({ title, message }: FormAlertFailureProps) {
    if (!message) {
        return null;
    }

    return (
        <Alert className="text-background bg-destructive">
            <ExclamationTriangleIcon color="var(--color-white)" className="h-4 w-4 my-auto" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
