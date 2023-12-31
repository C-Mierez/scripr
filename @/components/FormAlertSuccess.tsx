import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

// import css from "./FormAlertSuccess.module.scss";

interface FormAlertSuccessProps {
    title?: string;
    message?: string;
}

export default function FormAlertSuccess({ title, message }: FormAlertSuccessProps) {
    if (!message || !title) {
        return null;
    }

    return (
        <Alert>
            <CheckCircledIcon className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
