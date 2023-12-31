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
        <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
